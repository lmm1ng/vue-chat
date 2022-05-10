import api from '@/api'

export default {
    namespaced: true,
    state: {
        usersList: []
    },
    getters: {
        getUsersList: state => state.usersList
    },
    actions: {
        fetchUsersList({commit}, nickname) {
            return api.users.getUsers(nickname).then(response => commit('setUsersList', response.list))
        }
    },
    mutations: {
        setUsersList(state, payload) {
            state.usersList = payload
        }
    }
}