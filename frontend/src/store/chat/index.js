import api from '@/api'

export default {
    namespaced: true,
    state: {
        userChats: [],
        activeChat: null
    },
    getters: {
        getUserChats: state => state.userChats,
        getActiveChat: state => state.activeChat
    },
    actions: {
        fetchCreateChat({commit}, requestData) {
            return api.chat.createChat(requestData)
        },
        fetchGetChats({commit}) {
            return api.chat.getChats().then(response => commit('setUserChats', response.list))
        }
    },
    mutations: {
        setUserChats(state, payload) {
            state.userChats = payload
        },
        setActiveChat(state, payload) {
            state.activeChat = payload
        },
        insertMessage(state, payload) {
            console.log('insert', payload.text)
            const chat = state.userChats.find(chat => chat.id === payload.chat)
            chat.messages.unshift(payload)
        }
    }
}