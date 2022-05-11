const Router = require('express')
const authMiddleware = require('../middleware/auth.middleware')
const chatController = require('../controllers/chatController')

const router = new Router()

router.post('/', authMiddleware, chatController.createChat)
router.get('/', authMiddleware, chatController.getChats)

module.exports = router