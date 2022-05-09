import request from '@/api/request'

export default {
    register (requestData) {
        return request({
            method: 'POST',
            url: '/api/auth/registration',
            data: requestData
        })
    },
    login(requestData) {
        return request({
            method: 'POST',
            url: '/api/auth/login',
            data: requestData
        })
    }
}