const {Server} = require("socket.io")
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')
const Message = require('../models/Message')
const Chat = require('../models/Chat')

const store = {
    onlineUsers: new Set()
}

const getUserIdByToken = socket => {
    return token = jwt.verify(socket.handshake.headers.cookie.replace('token=', ''), config.get('jwtSecret'))?.id
}

const initSocket = server => {
    const io = new Server(server, {
        allowEIO3: true
    })
    io.use((socket, next) => {
        const token = socket.handshake.headers.cookie.replace('token=', '')
        if (jwt.verify(token, config.get('jwtSecret'))) {
            next()
        } else {
            next(new Error('Authentication error'));
        }
    })
    io.on('connection', async socket => {
        const userId = getUserIdByToken(socket)
        store.onlineUsers.add(userId)
        const dbUser = await User.findOne({_id: userId})
        for (const chatId of dbUser.chats) {
            socket.join(`chat:${chatId}`)
        }

        socket.on('disconnect', () => {
            const userId = getUserIdByToken(socket)
            if (store.onlineUsers.has(userId)) {
                store.onlineUsers.delete(userId)
            }
        })
        socket.on('send message', async data => {
            const message = new Message(data)
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