import api from '@/api'
import {generateChatKey, decryptMessage} from '@/utils/crypto'

export default {
    namespaced: true,
    state: {
        userChats: [],
        activeChat: null
    },
    getters: {
        getUserChats: (state, getters, rootState, rootGetters) => state.userChats.sort((a, b) => new Date(b) - new Date(a)).map(chat => {
            if (chat.type === 'dialog') {
                return {
                    ...chat,
                    name: chat.members.filter(el => el.id !== rootGetters["auth/getUser"].id)[0].nickname,
                    messages: chat.messages.map(message => ({
                        ...message,
                        text: decryptMessage(message.text, localStorage.getItem(chat.id))
                    }))
                }
            }
        }),
        getActiveChat: state => state.activeChat
    },
    actions: {
        fetchCreateChat({commit}, requestData) {
            return api.chat.createChat(requestData).then((chat) => {
                localStorage.setItem(chat.id, generateChatKey())
            })
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
            const chat = state.userChats.find(chat => chat.id === payload.chat)
            chat.messages.unshift(payload)
        }
    }
}