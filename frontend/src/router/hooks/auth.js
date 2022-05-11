import Cookies from 'js-cookie'
import store from '@/store'

export const isAuthorized = (to, from, next) => {
    if (Cookies.get('token')) {
        if(!store.getters['auth/getUser']) {
            store.dispatch('auth/fetchUser')
        }
        next()
        return
    }
    next('/login')
}

export const beforeAuthPageHook = (to, from, next) => {
    store.dispatch('auth/makeLogout').then(() => next())
}