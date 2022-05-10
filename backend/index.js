const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const cookieParser = require('cookie-parser')

const app = express()
app.use(cookieParser())
app.use(express.json())

const authRouter = require('./routes/auth.routes')
const userRouter = require('./routes/user.routes')

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)

const PORT = config.get('serverPort')

const start = async () => {
    try {
        await mongoose.connect(config.get('dbUrl'))
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })
    } catch (e) {
        console.log('error')
    }
}

start()