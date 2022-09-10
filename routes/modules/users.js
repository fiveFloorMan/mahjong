const express = require('express')
const router = express.Router()

const Player = require('../../models/player')
// 註冊
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const registerData = req.body
  Player.create({
    
  })
})

router.get('/login', (req, res) => {
  res.render('login')
})

module.exports = router