import request from '@/api/request'

export default {
    register (requestData) {
        return request({
            method: 'POST',
            url: '/api/v1/auth/registration',
            data: requestData
        })
    },
    login(requestData) {
        return request({
            method: 'POST',
            url: '/api/v1/auth/login',
            data: requestData
        })
    },
    getUser() {
        return request({
            method: 'GET',
            url: '/api/v1/auth/user',
        })
    }
}