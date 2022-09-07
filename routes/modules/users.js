const express = require('express')
const router = express.Router()

// 註冊
router.get('/register', (req, res) => {
  res.render('register')
})

router.get('/login', (req, res) => {
  res.render('login')
})

module.exports = router