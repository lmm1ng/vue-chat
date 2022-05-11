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
                        members: [req.user.id, ...req.body.members]
                    })
                    break
                case 'dialog':
                    if (req.body.members.length !== 1) {
                        return res.status(400).json({message: 'Only 2 members in dialog'})
                    }
                    const isDialogExists = await Chat.findOne({members: {$all: [req.user.id, ...req.body.members]}})
                    if (isDialogExists) {
                        return res.status(400).json({message: 'Dialog exists'})
                    }
                    chat = new Chat({type: req.body.type, members: [req.user.id, ...req.body.members]})
                    break
                default:
                    return res.status(400).json({message: 'Wrong chat type'})
            }
            await chat.save()
            for (const userId of chat.members) {
                const dbUser = await User.findOne({_id: userId})
                dbUser.chats.push(chat.id)
                await dbUser.save()
            }
            return res.json({message: 'Chat created'})
        } catch (e) {
            return res.status(500).json({message: 'Server error'})
        }
    }

    async getChats(req, res) {
        try {
            const dbUser = await User.findOne({_id: req.user.id})
            const chats = []
            for (const chat of dbUser.chats) {
                chats.push(await Chat.findOne({_id: chat}).populate('members').populate('messages'))
            }
            return res.json({
                list: chats.map(chat => ({
                    ...chat._doc,
                    id: chat._id,
                    members: chat.members.map(member => ({
                        id: member.id,
                        nickname: member.nickname
                    })).filter(member => member.id !== req.user.id),
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
            return res.status(500).json({message: 'Server error'})
        }
    }
}

module.exports = new ChatController()