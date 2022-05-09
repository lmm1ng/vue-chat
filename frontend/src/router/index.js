import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/views/Main'
import Registration from '@/views/Registration'
import Login from '@/views/Login'

const routes = [
  {
    path: '/registration',
    name: 'Registration',
    component: Registration,
    meta: {
      layout: 'LoginLayout'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      layout: 'LoginLayout'
    }
  },
  {
    path: '/',
    name: 'Main',
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
