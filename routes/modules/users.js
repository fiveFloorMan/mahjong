const express = require('express')
const router = express.Router()

const Player = require('../../models/player')
// 註冊
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, password, confirmPassword, experience } = req.body

  // register 過程中的錯誤辨認
  const errors = []
  // 有沒有填寫的欄位
  if ( !name || !password || !confirmPassword ) {
    errors.push({ message: '所有欄位都是必填的'})
  }
  // password 和 confirmPassword 是否相同
  if ( password !== confirmPassword ) {
    errors.push({ message: '密碼和確認密碼不相符'})
  }
  
  if (errors.length) {
    return res.render('register', { errors })
  }
  // name 是否已經被註冊過
  const registeredName = Player.findOne({ name })
  if (registeredName) {
    errors.push({ message: '這個名稱已經被註冊過了'})
  }  


  if (!errors.length){
    Player.create({ name, password, experience })
    res.redirect('/users/login')
  }
  
})

// 登入
router.get('/login', (req, res) => {
  res.render('login')
})

module.exports = router