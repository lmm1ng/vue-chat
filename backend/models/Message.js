const { Schema, model, ObjectId } = require('mongoose')

const Message = new Schema({
    text: { type: String },
    createdAt: { type: Date, required: true },
    from: { type: ObjectId, ref: 'User' },
    chat: { type: ObjectId, ref: 'Chat' }
})

module.exports = model('Message', Message)