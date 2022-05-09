const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({message: 'Auth error'})
        }
        req.user = jwt.verify(token, config.get('jwtSecret'))
        next()
    } catch (e) {
        return res.status(401).json({message: 'Auth error'})
    }
}