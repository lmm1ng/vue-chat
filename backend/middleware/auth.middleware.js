const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return res.status(200).send()
    }

    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({message: 'Auth error'})
        }
        req.user = jwt.verify(token, config.get('jwtSecret'))
        next()
    } catch (e) {
        console.log(e)
        return res.status(401).json({message: 'Auth error'})
    }
}