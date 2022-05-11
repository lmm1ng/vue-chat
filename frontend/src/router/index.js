import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/views/Main'
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
    name: 'Main',
    beforeEnter: isAuthorized,
    component: Main,
    meta: {
      layout: 'MainLayout'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
