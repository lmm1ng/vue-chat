const {Schema, model, ObjectId} = require('mongoose')
const {defaultAvatar} = require('../constants/images')

const Chat = new Schema({
    type: {type: String, required: true},
    members: [{
        ref: {
            type: ObjectId,
            ref: 'User'
        },
        deviceId: {type: String, default: 'notSelected'},
    }],
    messages: [{type: ObjectId, ref: 'Message'}],
    name: {type: String, default: 'default'},
    avatar: {type: String, default: defaultAvatar},
    createdAt: {type: Date, required: true},
    admin: {type: 'ObjectId', ref: 'User', required: true}
})

module.exports = model('Chat', Chat)