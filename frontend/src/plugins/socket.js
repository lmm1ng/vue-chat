import {io} from 'socket.io-client'

export default {
    install: (app, {options}) => {
        const socket = io(options)
        app.config.globalProperties.$socket = socket

        app.provide('socket', socket)
    }
}