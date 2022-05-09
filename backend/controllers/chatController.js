const Chat = require('../models/Chat')
const User = require('../models/User')

class ChatController {
    async createChat (req, res) {
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
                    chat = new Chat({ type: req.body.type, name: req.body.name, members: [req.user.id, ...req.body.members]})
                    break
                case 'dialog':
                    chat = new Chat({ type: req.body.type, members: [req.user.id, ...req.body.members]})
                    break
                default:
                    return res.status(400).json({message: 'Wrong chat type'})
            }
            chat.save()
            for (const userId of chat.members) {
                const dbUser = await User.findOne({_id: userId})
                dbUser.chats.push(chat.id)
                dbUser.save()
            }

        } catch (e) {
            return res.status(500).json({message: 'Server error'})
        }
    }
}