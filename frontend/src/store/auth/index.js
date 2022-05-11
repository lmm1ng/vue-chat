import api from '@/api'
import Cookies from 'js-cookie'

export default {
    namespaced: true,
    state: {
        user: null,
        isAuthLoading: false
    },
    getters: {
        getUser: state => state.user,
        isAuthLoading: state => state.isAuthLoading
    },
    actions: {
        fetchRegister ({commit}, requestData) {
            commit('setAuthLoading', true)
            return api.auth.register(requestData).then(() => commit('setAuthLoading', false))
        },
        fetchLogin ({commit}, requestData) {
            commit('setAuthLoading', true)
            return api.auth.login(requestData).then(response => {
                commit('setToken', response)
                commit('setUser', response)
                commit('setAuthLoading', false)
            })
        },
        fetchUser({commit}) {
            return api.auth.getUser().then(response => {
                commit('setUser', response)
            })
        },
        makeLogout({commit}) {
            commit('logout')
        }
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload.user
        },
        setToken (state, payload) {
            Cookies.set('token', payload.token)
        },
        setAuthLoading(state, payload) {
            state.isAuthLoading = payload
        },
        logout() {
            Cookies.remove('token')
        }
    }
}