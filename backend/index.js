const express = require('express')
const http = require('http')
const cors = require('cors');
const initSocket = require('./services/socket')

const mongoose = require('mongoose')
const config = require('config')
const cookieParser = require('cookie-parser')

const app = express()
const server = http.createServer(app)
initSocket(server)

app.use(cors({
    credentials: true,
    origin: ["http://localhost:5000"],
    optionsSuccessStatus: 200
}))
app.use(cookieParser())
app.use(express.json())

const authRouter = require('./routes/auth.routes')
const userRouter = require('./routes/user.routes')
const chatRouter = require('./routes/chat.routes')

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/chat', chatRouter)

const PORT = config.get('serverPort')

const start = async () => {
    try {
        await mongoose.connect(config.get('dbUrl'))
        server.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })
    } catch (e) {
        console.log('error')
    }
}

start()