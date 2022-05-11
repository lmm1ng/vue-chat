import request from '@/api/request'

export default {
    createChat (requestData) {
        return request({
            method: 'POST',
            url: '/api/v1/chat',
            data: requestData
        })
    },
    getChats () {
        return request({
            method: 'GET',
            url: '/api/v1/chat',
        })
    }
}