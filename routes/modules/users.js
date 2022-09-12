const express = require('express')
const player = require('../../models/player')
const router = express.Router()

const Player = require('../../models/player')
// 註冊
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { playerName, password, confirmPassword, experience } = req.body

  // 註冊防呆
  const errors = []
  // 有沒有填寫的欄位
  if ( !playerName || !password || !confirmPassword ) {
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
  Player.findOne({ playerName })
    .lean()
    .then(registerName => {
      console.log('registerName', registerName)
      if (registerName) {
        errors.push({ message: '這個名稱已經被註冊過了'})
        return res.render('register', { errors })
      }
      // 通過防呆後建立帳號
      if (!errors.length) {
        Player.create({ playerName, password, experience})
        return res.render('login')
      }
    })
  
})

// 登入
router.get('/login', (req, res) => {
  res.render('login')
})

module.exports = router