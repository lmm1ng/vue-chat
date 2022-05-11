import request from '@/api/request'

export default {
    getUsers(nickname) {
        return request({
            method: 'GET',
            url: '/api/v1/users',
            params: {nickname}
        })
    },
}