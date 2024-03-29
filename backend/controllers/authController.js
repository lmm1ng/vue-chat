const {validationResult} = require("express-validator")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')

class AuthController {
    async register(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                res.status(400).json({message: 'Incorrect data', errors})
            }
            const {email, password, nickname, inviteKey} = req.body
            const isExists = await User.findOne({email})
            if (isExists) {
                return res.status(400).json({message: 'User already exists'})
            }
            const hashedPassword = await bcrypt.hash(password, 8)
            const user = new User({email, password: hashedPassword, nickname, createdAt: new Date()})
            await user.save()
            res.json({message: 'User created'})
        } catch (e) {
            res.status(500).json({message: 'Server error'})
        }
    }

    async login(req, res) {
        try {
            const {email, password, deviceId} = req.body
            if (!deviceId) {
                return res.status(400).json({message: 'Device id required'})
            }
            const user = await User.findOne({email})
            if (!user) {
                return res.status(404).json({message: 'User not found'})
            }
            const isPasswordValid = bcrypt.compareSync(password, user.password)
            if (!isPasswordValid) {
                return res.status(400).json({message: 'Invalid password'})
            }
            const token = jwt.sign({id: user.id, deviceId}, config.get('jwtSecret'), {expiresIn: '1h'})
            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    avatar: user.avatar,
                    chatIds: user.chats
                }
            })
        } catch (e) {
            console.log(e)
            res.status(500).json({message: e})
        }
    }

    async getUser(req, res) {
        try {
            const dbUser = await User.findOne({_id: req.user.id})
            res.json({
                user: {
                    id: dbUser.id,
                    email: dbUser.email,
                    avatar: dbUser.avatar,
                    chatIds: dbUser.chats
                }
            })
        } catch (e) {
            res.status(500).json({message: 'Server error'})
        }
    }
}

module.exports = new AuthController()