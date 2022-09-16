const express = require('express')
const router = express.Router()

const Record = require('../../models/record')

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
  
})


module.exports = router