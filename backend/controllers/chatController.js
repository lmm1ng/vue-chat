const Chat = require('../models/Chat')
const User = require('../models/User')

class ChatController {
    async createChat(req, res) {
        try {
            if (!req.body.type) {
                return res.status(400).json({message: 'type required'})
            }
            let chat = null
            switch (req.body.type) {
                case 'group':
                    if (!req.body.name) {
                        return res.status(400).json({message: 'name required'})
                    }
                    chat = new Chat({
                        type: req.body.type,
                        name: req.body.name,
                        members: [req.user.id, ...req.body.members].map(userId => ({
                            ref: userId,
                            deviceId: userId === req.user.id ? req.user.deviceId : undefined
                        })),
                        createdAt: new Date(),
                        admin: req.user.id
                    })
                    break
                case 'dialog':
                    if (req.body.members.length !== 1) {
                        return res.status(400).json({message: 'Only 2 members in dialog'})
                    }
                    // const isDialogExists = await Chat.findOne({'members.ref': {$all: [req.user.id, ...req.body.members]}})
                    // if (isDialogExists) {
                    //     return res.status(400).json({message: 'Dialog exists'})
                    // }
                    chat = new Chat({
                        type: req.body.type,
                        members: [req.user.id, ...req.body.members].map(userId => ({
                            ref: userId,
                            deviceId: userId === req.user.id ? req.user.deviceId : undefined
                        })),
                        createdAt: new Date(),
                        admin: req.user.id
                    })
                    break
                default:
                    return res.status(400).json({message: 'Wrong chat type'})
            }
            await chat.save()
            for (const user of chat.members) {
                const dbUser = await User.findOne({_id: user.ref})
                dbUser.chats.push(chat.id)
                await dbUser.save()
            }
            const outChat = await chat.populate('members.ref')
            return res.json({
                ...outChat._doc,
                id: outChat._id,
                members: outChat.members.map(member => ({
                    id: member.ref.id,
                    nickname: member.ref.nickname,
                    deviceId: member.deviceId
                })),
                messages: []
            })
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Server error'})
        }
    }

    async getChats(req, res) {
        try {
            const dbUser = await User.findOne({_id: req.user.id})
            const chats = []
            for (const chat of dbUser.chats) {
                const dbChat = await Chat.findOne({
                    _id: chat
                }).populate('members.ref').populate('messages')
                if (dbChat) {
                    chats.push(dbChat)
                }
            }
            return res.json({
                list: chats.map(chat => ({
                    ...chat._doc,
                    id: chat._id,
                    members: chat.members.map(member => ({
                        id: member.ref.id,
                        nickname: member.ref.nickname
                    })),
                    messages: chat.messages.map(message => ({
                        id: message._id,
                        chat: message.chat,
                        from: message.from,
                        text: message.text,
                        createdAt: message.createdAt
                    }))
                }))
            })
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Server error'})
        }
    }
}

module.exports = new ChatController()