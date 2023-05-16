const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Reserve = require('../../models/reserve')

// 單筆資料查詢(全體)
router.get('/playerScore', (req, res) => {
  Record.find()
    .lean()
    .then(Data => {
      // 抓出playerName,作為select選項且不重複
      const playerNameArray = []
      for(let i = 0; i < Data.length; i++){
        playerNameArray.push(Data[i].playerName)
      }
      const playerNameArraySet = new Set(playerNameArray)

      // sort
      Data.sort((a, b) => {
        return new Date(a.date) - new Date(b.date)
      })
      return res.render('gamesPlayerScore', { Data, playerNameArraySet })
    })
})

// 單筆資料查詢(單人)
router.get('/playerScore/search', (req, res) => {
  const { keyPlayerName } = req.query
  Record.find({ playerName: keyPlayerName })
    .lean()
    .then(Data => {
      let totalScore = 0
      let totalGameTimes = 0
      Data.map(data => {
        totalScore += data.score
        totalGameTimes += data.gameTimes
      })
      Data.sort((a, b) => {
        return new Date(a.date) - new Date(b.date)
      })
      return res.render('SearchGamesPlayerScore', { Data, totalScore, totalGameTimes, keyPlayerName })
    })
})

// 預定games時間
router.get('/reserve', (req, res) => {
  Reserve.find()
    .lean()
    .then(reserve => {
      reserve.sort((a, b) => {
        return new Date(a.date) - new Date(b.date)
      })
      // 清除無效值
      for(let i = 0; i < reserve.length; i++){
        let index = reserve[i].participatingPlayer.indexOf('')
        if(index > -1){
          reserve[i].participatingPlayer.splice(index) 
        }
      }
      return res.render('gameReserve', { reserve })
    })
    .catch(error => console.log(error))
})

// 使用者選擇參加game的data
router.put('/reserve/:reservedId/addGame', (req, res) => {
  const { reservedId } = req.params
  const newPlayer = res.locals.user.playerName
  Reserve.findById({ _id: reservedId })
    .lean()
    .then(game => {
      const playerList = game.participatingPlayer
      // 清除無效值 & 判斷是否滿桌
      let index = playerList.indexOf('')
      console.log(index)
      if(index > -1){ playerList.splice(index) }
      if(playerList.indexOf('目前沒有玩家參賽') !== -1){
        playerList.splice(playerList.indexOf('目前沒有玩家參賽'), 1)
      }
      if(playerList.length === 4){
        req.flash('warning_msg', '這場已經滿桌了, 歡迎你選擇其他場次')
        return res.redirect('/games/reserve');
      };
      // 加入牌局
      playerList.push(newPlayer)
      Reserve.findOneAndUpdate({ _id: reservedId},{
        participatingPlayer: playerList
      })
        .then((game) => req.flash('success_msg', `已經成功加入${game.date}的牌局了`))
        .then(() => { return res.redirect('/games/reserve')})
    })
})
module.exports = router