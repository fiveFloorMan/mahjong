const express = require('express')
const router = express.Router()

const Record = require('../../models/record.js')
const Reserve = require('../../models/reserve')
const Player = require('../../models/player')

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
      const { isAdmin } = res.locals.user
      if(isAdmin === true){
        return res.render('openGameReserve', {reserve})
      } else {
        errors.push({ message: '請先登入並且確保有管理員的權限' })
        return res.render('login', { errors })
      }
    })
    .catch(error => console.log(error))
})

// 由admin 新增可以預約的時間
router.post('/openGameReserve', (req, res) => {
  const openGame = req.body
  Reserve.create({
    gameName: openGame.gameName,
    openAdmin: res.locals.user.playerName,
    date: openGame.openGameDate
  })
  .then(() => { req.flash('success_msg', `成功開放了${openGame.openGameDate}的預約時間`) })
  .then(() => { return res.redirect('/admin/openGameReserve')})  
  .catch(error => console.log(error))
})

// 由admin 編輯預約的資料
router.post('/:reservedId/openGameReserve/edit', (req, res) => {
  const { reservedId } = req.params
  Reserve.findById({ _id: reservedId })
    .lean()
    .then(reservedEdit => {  
      const reserveParticipatingPlayerArray = reservedEdit.participatingPlayer

      return res.render('openGameReserveEdit', {reservedEdit, reservedId, reserveParticipatingPlayerArray})
    })
    .catch(error => console.log(error))
})

// 編輯game的data
router.post('/gameChange', (req, res) => {
  const data = req.body
  Reserve.findOneAndUpdate({ _id: data.reservedId }, {
    gameName: data.gameName,
    date: data.date
  }, {
    new: false
  })
    .then(() => { req.flash('success_msg', '遊戲資料更改成功')})
    .then(() => res.redirect('/admin/openGameReserve'))
    .catch(error => console.log(error))
})

// 由admin 編輯預約的資料, 更改participating player頁
router.post('/:reservedId/participatingPlayerChange/openGameReserve/edit', (req, res) => {
  Player.find()
    .lean()
    .then(Data => {
      const playerList = Data.map(data => data.playerName)
      const { reservedId } = req.params
      const { participatingPlayer } = req.body
      // 整理participating player list
      const participatingPlayerArray = participatingPlayer.split(',')
      
      while(participatingPlayerArray.length < 6){
        participatingPlayerArray.push('目前沒有玩家參賽')
      }
      const cleanParticipatingPlayerArray = participatingPlayerArray.filter(function(player){
        return player && player.trim()
      })
      if(cleanParticipatingPlayerArray.length = 5){
        cleanParticipatingPlayerArray.splice(-1, 1)
      }
      return res.render('openGameReservePlayerEdit', { reservedId, playerList, cleanParticipatingPlayerArray })
    })
    .catch(error => console.log(error))
})

// 更改參賽玩家
router.post('/participatingPlayerChange', (req, res) => {
  const { reservedId } = req.body
  const players = req.body.participatingPlayerEdit
  Reserve.findOneAndUpdate({ _id : reservedId }, {
    participatingPlayer: players},
    { new: false }
    )
    .then(() => { req.flash( 'success_msg', `更改成功了` )})
    .then(() => { return res.redirect(`/admin/openGameReserve`)})
    .catch(error => console.log(error))
})

// 由admin Delete預約的資料
router.delete('/:reservedId/openGameReserve/delete', (req, res) => {
  const { reservedId } = req.params
  Reserve.deleteOne({ _id : reservedId })
    .then(() => { req.flash('success_msg', '刪除成功') })
    .then(() => { return res.redirect('/admin/openGameReserve')})
    .catch(error => console.log(error))
})

module.exports = router