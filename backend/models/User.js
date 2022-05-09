const { Schema, model, ObjectId } = require('mongoose')

const User = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nickname: { type: String, required: true, unique: true },
    avatar: { type: String, default: 'default' },
    createdAt: { type: Date, required: true },
    chats: [{ type: ObjectId, ref: 'Chat' }]
})

module.exports = model('User', User)