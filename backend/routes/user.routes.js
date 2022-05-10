const Router = require('express')
const authMiddleware = require('../middleware/auth.middleware')
const userController = require('../controllers/userController')

const router = new Router()

router.get('/', authMiddleware, userController.getUsersByNickname)

module.exports = router