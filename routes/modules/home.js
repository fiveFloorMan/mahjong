// 首頁 : 顯示玩家排名
const express = require('express')
const router = express.Router()

router.use('/', (req, res) => {
  res.render('index')
})

module.exports = router