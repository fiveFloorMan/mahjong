// 首頁 : 顯示玩家排名
const express = require('express')
const router = express.Router()

const Record = require('../../models/record.js') // 整包資料

const allPlayerName = [] 

router.get('/', (req, res) => {
  Record.find() //非同步
    .lean()
    .then(Data => {
      // 拿出playerName
      pushAllPlayerName(Data)
      let filterPlayerName = allPlayerName.filter(function(playerName, index, self){
        return self.indexOf(playerName) === index;
      })
      
      // 整理相同姓名(playerName)的成績(Score) & 降數(gameTimes)
      const scoreArray = []
      const gameTimesArray = []

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
        gameTimesArray.push(gameTimes)
      })

      // 組成一個Array
      const playerData = filterPlayerName.map((name, index) => ({ 
        playerName: name,
        score: scoreArray[index],
        gameTimes: gameTimesArray[index]
      }))

      //排序
      playerData.sort(function(a, b) {
        return b.score - a.score //降冪
      })

      // 加入排行數字
      let rankNumber = []
      for(let i = 1; i <= playerData.length; i++){
        rankNumber.push(i)
      }
      const playerDataRank = rankNumber.map((rank, index) => ({
        rank: rank,
        playerName: playerData[index].playerName,
        score: playerData[index].score,
        gameTimes: playerData[index].gameTimes
      }))
    res.render('index', { playerDataRank })
    })
    .catch(error => console.log(error))
})

function pushAllPlayerName(Data) {
  for(let i = 0; i < Data.length; i++){
    allPlayerName.push(Data[i].playerName)
  }
}

module.exports = router