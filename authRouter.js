const Router = require('express')
const {check} = require('express-validator')
const authController = require('./authController')
const authMiddleware = require('./middleware/authMiddleware')
const roleMiddleware = require('./middleware/roleMiddleware')
const router = Router()

router.post('/registration', [
    check('username', 'this fields must not be empty ').notEmpty(),
    check('password', 'password must be grater than 3 and shorter than 20').isLength({min: 4, max: 20})], authController.registration)
router.post('/login', authController.login)
router.get('/users',roleMiddleware(['USER','ADMIN']), authController.getUser)

module.exports = router
