const {Schema, model, ObjectId} = require('mongoose')
const {defaultAvatar} = require('../constants/images')

const Chat = new Schema({
    type: {type: String, required: true},
    members: [{type: ObjectId, ref: 'User'}],
    messages: [{type: ObjectId, ref: 'Message'}],
    name: {type: String, default: 'default'},
    avatar: {type: String, default: defaultAvatar}
})

module.exports = model('Chat', Chat)