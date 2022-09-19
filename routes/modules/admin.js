const express = require('express')
const router = express.Router()

const Record = require('../../models/record.js')
const Reserve = require('../../models/reserve')

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
  .then(() => { req.flash( 'success_msg', `成功建立${newRecord.playerName}的紀錄了` )})
  .then(() => {
    return res.redirect('/admin/addRecord')
  })
  .catch(error => console.log(error))
})

// 編輯玩家資料
// layouts 頁面
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

// edit feature
router.post('/edit/:recordId', (req, res) => {
  const { recordId } = req.params
  Record.findById({ _id: recordId })
    .lean()
    .then(editedRecord => {
      return res.render('editRecordSingle', { editedRecord })
    })
    .catch(error => console.log(error))
})

router.put('/edit/:recordId', (req, res) => {
  const { recordId } = req.params
  const newEditData = req.body
  console.log('req.body', req.body)
  Record.findOneAndUpdate({ _id: recordId }, {
    playerName: newEditData.playerName,
    score: newEditData.score,
    gameTimes: newEditData.gameTimes,
    date: newEditData.date,
  }, { new: false })
    .then(() => {
      return res.redirect('/admin/edit')
    })
    .catch(error => console.log(error))
})

// 刪除record資料
router.delete('/delete/:recordId', (req, res) => {
  const { recordId } = req.params
  Record.deleteOne({ _id: recordId })
    .lean()
    .then(() => { 
      return res.redirect('/admin/edit')
    })
    .catch(error => console.log(error))
})

// 開放可以預約的時間
router.get('/openGameReserve', (req, res) => {
  Reserve.find()
    .lean()
    .then(reserve => {
      return res.render('openGameReserve', {reserve})
    })
    .catch(error => console.log(error))
})

// 由admin 新增可以預約的時間
router.post('/openGameReserve', (req, res) => {
  const openGame = req.body
  console.log(openGame)
  Reserve.create({
    gameName: openGame.gameName,
    openAdmin: res.locals.user.playerName,
    date: openGame.openGameDate
  })
  .then(() => {req.flash('success_msg', `成功開放了${openGame.openGameDate}的預約時間` )})
  .then(() => { return res.redirect('/admin/openGameReserve')})  
  .catch(error => console.log(error))
})

// 由admin 更新預約的資料
router.post('/:reserveID/openGameReserve/edit', (req, res) => {
  res.redirect('/')
})

module.exports = router