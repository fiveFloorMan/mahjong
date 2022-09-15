const express = require('express')
const router = express.Router()

const Record = require('../../models/record.js')

const success_msg = []
const errors = []
// 新增紀錄
router.get('/addRecord', (req, res) => {
  const { isAdmin } = res.locals.user

  // 登入者是否有管理員身分辦別
  if (isAdmin === true) {
    return res.render('addRecord')
  } else {
    errors.push({ message: '請先登入並且確保有管理員的權限' })
    res.render('login', { errors })
  }

})

// 新增紀錄行動 (優化可以為一次增加多個紀錄)
router.post('/addRecord', (req, res) => {
  const newRecord = req.body  
  Record.create({
    playerName: newRecord.playerName,
    score: newRecord.score,
    gameTimes: newRecord.gameTimes,
    date: newRecord.date
  })
  success_msg.push(`成功建立${newRecord.playerName}的紀錄了`)
  res.render('addRecord', { success_msg })
})

// 編輯玩家資料
router.get('/edit', (req, res) => {
  Record.find()
    .lean()
    .then(Data => {
      const { isAdmin } = res.locals.user
      if (isAdmin === true){
        return res.render('editRecord', {Data})        
      } else {
        errors.push({ message: '請先登入並且確保有管理員的權限' })
        return res.render('login', { errors })
      }
    })
    .catch(error => console.log(error))
})

module.exports = router