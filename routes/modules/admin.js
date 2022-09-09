const express = require('express')
const router = express.Router()

const Record = require('../../models/record.js')

// 新增紀錄
router.get('/addRecord', (req, res) => {
  res.render('addRecord')
})

router.post('/addRecord', (req, res) => {
  const newRecord = req.body  
  Record.create({
    playerName: newRecord.playerName,
    score: newRecord.score,
    gameTimes: newRecord.gameTimes,
    date: newRecord.date
  })
  // 可以再做一個提示新增成功的優化
  res.redirect('/admin/addRecord')
})

module.exports = router

