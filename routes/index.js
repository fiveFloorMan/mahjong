const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const users = require('./modules/users')
const admin = require('./modules/admin')

const { authenticator } = require('../middleware/auth')

router.use('/admin', authenticator, admin)
router.use('/users', users)
router.use('/', home)



module.exports = router