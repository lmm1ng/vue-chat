import Cookies from 'js-cookie'
import store from '@/store'
import {app} from '@/main'

export const  isAuthorized = async (to, from, next) => {
    if (Cookies.get('token')) {
        if(!store.getters['auth/getUser']) {
            await store.dispatch('auth/fetchUser')
        }
        if (!app.$socket.connected) {
            await app.$socket.connect()
        }
        next()
        return
    }
    next('/login')
}

export const beforeAuthPageHook = (to, from, next) => {
    store.dispatch('auth/makeLogout').then(() => {
        app.$socket.disconnect()
        next()
    })
}