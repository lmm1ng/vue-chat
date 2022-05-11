const User = require('../models/User')

class UserController {
    async getUsersByNickname(req, res) {
        try {
            const nickname = req.query?.nickname
            if (!nickname) {
                res.json({list: []})
            }
            const users = await User.find({nickname: {$regex: new RegExp(nickname, 'i')}})
            res.json({
                list: users.map(el => ({
                    id: el.id,
                    nickname: el.nickname,
                    avatar: el.nickname
                })).filter(el => el.id !== req.user.id)
            })
        } catch (e) {
            res.status(500).json({message: 'Server error'})
        }
    }
}

module.exports = new UserController()