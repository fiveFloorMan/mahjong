const express = require('express')
const router = express.Router()

const Record = require('../../models/record.js')

const errors = []
// 新增紀錄
router.get('/addRecord', (req, res) => {
  const { isAdmin } = res.locals.user

  // 登入者是否有管理員身分辦別
  if( isAdmin === true ){
    return res.render('addRecord')
  } else {
    errors.push({ message: '請先登入並且確保有管理員的權限' })
    res.render('login', { errors })
  }

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

