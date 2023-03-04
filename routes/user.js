const express = require('express')
const router = express.Router()
const {testUser , signup , login , logout} = require('../controllers/userController')

router.route('/testuser').get(testUser)
router.route('/user/signup').post(signup)
router.route('/user/login').post(login)
router.route('/user/logout').get(logout)

module.exports = router