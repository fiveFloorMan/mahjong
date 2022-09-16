const express = require('express')
const router = express.Router()


// 個人資料查詢
router.get('/playerScore', (req, res) => {
  res.render('gamesPlayerScore')
})


// 預定games時間
router.get('/reserve', (req, res) => {
  
})


module.exports = router