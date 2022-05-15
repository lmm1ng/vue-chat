import Cookies from 'js-cookie'
import store from '@/store'
import {app} from '@/main'

export const isAuthorized = (to, from, next) => {
    if (Cookies.get('token')) {
        if(!store.getters['auth/getUser']) {
            store.dispatch('auth/fetchUser')
        }
        console.log(app.$socket.connected)
        if (!app.$socket.connected) {
            app.$socket.connect()
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