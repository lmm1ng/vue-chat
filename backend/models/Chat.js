const { Schema, model, ObjectId } = require('mongoose')

const Chat = new Schema({
    type: { type: String, required: true },
    members: [{ type: ObjectId, ref: 'User'}],
    messages: [{ type: ObjectId, ref: 'Message' }],
    name: { type: String, default: 'default' },
    avatar: { type: String, default: 'default' }
})

module.exports = model('Chat', Chat)