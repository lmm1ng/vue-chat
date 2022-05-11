const {Schema, model, ObjectId} = require('mongoose')

const Message = new Schema({
    text: {type: String, required: true},
    createdAt: {type: Date, required: true},
    from: {type: ObjectId, ref: 'User', required: true},
    chat: {type: ObjectId, ref: 'Chat', required: true}
})

module.exports = model('Message', Message)