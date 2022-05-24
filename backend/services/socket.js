const {Server} = require("socket.io")
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')
const Message = require('../models/Message')
const Chat = require('../models/Chat')

const initSocket = server => {
    const io = new Server(server, {
        allowEIO3: true
    })
    io.use((socket, next) => {
        try {
            jwt.verify(socket.handshake.headers.cookie.replace('token=', ''), config.get('jwtSecret'))
            return next()
        } catch (e) {
            socket.disconnect()
            return next(new Error('Authentication error'));
        }
    })
    io.on('connection', async socket => {
        const {
            id,
            deviceId
        } = jwt.verify(socket.handshake.headers.cookie.replace('token=', ''), config.get('jwtSecret'))
        socket.userId = id
        socket.deviceId = deviceId

        const dbUser = await User.findOne({_id: id}).populate('chats')
        for (const chat of dbUser.chats) {
            socket.join(`chat:${chat._id}`)
            const clientsInRoom = await io.in(`chat:${chat._id}`).fetchSockets()
            socket.emit('chat online users', {
                chatId: chat._id,
                users: clientsInRoom.map(el => ({
                    id: el.userId,
                    thisDevice: chat.members.find(member => member.ref.toString() === el.userId)?.deviceId === el.deviceId
                }))
            })
            socket.to(`chat:${chat._id}`).emit('user joined', {
                chatId: chat._id,
                user: {
                    id: socket.userId,
                    thisDevice: chat.members.find(member => member.ref.toString() === socket.userId)?.deviceId === socket.deviceId
                }
            })
        }

        socket.on('disconnecting', () => {
            [...socket.rooms].forEach(roomId => {
                if (roomId.includes('chat:')) {
                    socket.to(roomId).emit('user leaved', {
                        chatId: roomId.replace('chat:', ''),
                        userId: socket.userId
                    })
                }
            })
        })
        socket.on('start diffie exchange', async data => {
            const members = await io.in(`chat:${data.chatId}`).fetchSockets()
            const withWhom = members.find(member => member.userId === data.to)
            if (withWhom) {
                withWhom.emit('request to exchange diffie', {
                    chatId: data.chatId,
                    from: data.from,
                    prime: data.prime,
                    generator: data.generator,
                    pub: data.pub
                })
            }
        })
        socket.on('send diffie public to admin', async data => {
            const members = await io.in(`chat:${data.chatId}`).fetchSockets()
            const admin = members.find(member => member.userId === data.to)
            if (admin) {
                admin.emit('send public from member', {
                    chatId: data.chatId,
                    from: data.from,
                    to: data.to,
                    pub: data.pub
                })
            }
        })
        socket.on('send message', async data => {
            const message = new Message({...data, createdAt: new Date()})
            message.save()
            socket.to(`chat:${message.chat}`).emit('receive message', {
                id: message._id,
                chat: message.chat,
                from: message.from,
                text: message.text,
                createdAt: message.createdAt
            })
            const dbChat = await Chat.findOne({_id: message.chat})
            dbChat.messages.push({
                $each: [message._id],
                $position: 0
            })
            dbChat.save()
        })
    });
}

module.exports = initSocket