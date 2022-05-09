const express = require('express')
const mongoose = require('mongoose')
const config = require('config')

const app = express()
app.use(express.json())

const authRouter = require('./routes/auth.routes')

app.use('/api/auth', authRouter)

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