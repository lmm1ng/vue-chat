import api from '@/api'
import {generateChatKey, decryptMessage} from '@/utils/crypto'

export default {
    namespaced: true,
    state: {
        userChats: [],
        activeChatId: null,
        onlineUsers: {}
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
        getActiveChat: (state, getters) => getters['getUserChats'].find(chat => chat.id === state.activeChatId),
        getActiveChatId: state => state.activeChatId,
        isUserOnline: state => (chatId, userId) => Boolean(state.onlineUsers[chatId].find(user => user.id === userId)),
        isUserOnlineThisDevice: state => (chatId, userId) => Boolean(state.onlineUsers[chatId].find(user => user.id === userId && user.thisDevice)),
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
            state.activeChatId = payload
        },
        insertMessage(state, payload) {
            const chat = state.userChats.find(chat => chat.id === payload.chat)
            chat.messages.unshift(payload)
        },
        setOnlineUsers(state, payload) {
            state.onlineUsers[payload.chatId] = payload.users
        },
        addOnlineUser(state, payload) {
            if (state.onlineUsers[payload.chatId].find(user => user.id !== payload.user.id)) {
                state.onlineUsers[payload.chatId].push(payload.user)
            }
        },
        removeOnlineUser(state, payload) {
            state.onlineUsers[payload.chatId] = state.onlineUsers[payload.chatId].filter(user => user.id !== payload.userId)
        }
    }
}