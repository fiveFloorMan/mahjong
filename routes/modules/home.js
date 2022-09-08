// 首頁 : 顯示玩家排名
const express = require('express')
const router = express.Router()

const Record = require('../../models/record.js') // 整包資料

const allPlayerName = [] 

router.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(Data => {
      // 拿出playerName
      pushAllPlayerName(Data)
      let filterPlayerName = allPlayerName.filter(function(playerName, index, self){
        return self.indexOf(playerName) === index;
      });
      
      // 整理相同姓名(playerName)的成績(Score) & 降數(gameTimes)
      const scoreArray = []
      const gameTimeArray = []
      filterPlayerName.map(function(name){
        let score = 0
        let gameTimes = 0
        Data.forEach(function(data){
          if(name === data.playerName){
            score = score + data.score
            gameTimes = gameTimes + data.gameTimes
          }
        })
        scoreArray.push(score)
        gameTimeArray.push(gameTimes)
      })
      // 以下去check console.log
      console.log('filterPlayerName', filterPlayerName)
      console.log('scoreArray', scoreArray)
      console.log('gameTimeArray', gameTimeArray)
    })
    .catch(error => console.log(error))
  res.render('index')
})

function pushAllPlayerName(Data) {
  for(let i = 0; i < Data.length; i++){
    allPlayerName.push(Data[i].playerName)
  }
}

module.exports = router