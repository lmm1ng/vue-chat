import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import socket from '@/plugins/socket'

window.Buffer = window.Buffer || require('buffer').Buffer;

export const app = createApp(App)
    .use(store)
    .use(router)
    .use(ElementPlus)
    .use(socket, {})
    .mount('#app')
