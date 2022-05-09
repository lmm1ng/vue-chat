const Router = require('express')
const { check, validationResult } = require('express-validator')
const  authController = require('../controllers/authController')

const router = new Router()

router.post('/registration',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Password must be longer than 4').isLength({min: 4}),
        check('nickname').exists(),
        check('inviteKey').exists()
    ],
    authController.register
)
router.post('/login', authController.login)

module.exports = router