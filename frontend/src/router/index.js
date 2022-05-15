import {createRouter, createWebHistory} from 'vue-router'
import {v4} from 'uuid'
import Chat from '@/views/Chat'
import Registration from '@/views/Registration'
import Login from '@/views/Login'
import {isAuthorized, beforeAuthPageHook} from '@/router/hooks/auth'

const routes = [
    {
        path: '/registration',
        name: 'Registration',
        beforeEnter: beforeAuthPageHook,
        component: Registration,
        meta: {
            layout: 'LoginLayout'
        }
    },
    {
        path: '/login',
        name: 'Login',
        beforeEnter: beforeAuthPageHook,
        component: Login,
        meta: {
            layout: 'LoginLayout'
        }
    },
    {
        path: '/',
        name: 'Chat',
        beforeEnter: isAuthorized,
        component: Chat,
        meta: {
            layout: 'MainLayout'
        }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach(() => {
    if (!localStorage.getItem('deviceId')) {
        localStorage.setItem('deviceId', v4())
    }
    return true
})

export default router
