const mongoose = require('mongoose')
const Record = require('../record')
const mahjongScoreRecords = require('./mahjong-score-record.json')
const data = mahjongScoreRecords.GameData // 過去的遊戲資料

mongoose.connect('mongodb+srv://harviehung:mahjong@mahjong.uo9sd2f.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('recordSeeder is error')
})

db.once('open', async () => {
  console.log('mongoose connected recordSeeder.js')
  
  // await Promise.all(
  //   data.map(async () => {
  //     await Record.create({
  //       playerName: data.name,
  //       score: data.score,
  //       date: data.date,
  //       gamesTime: data.gameTimes,
  //       special: data.special,
  //     })
  //   })
  // )
  const data_index = data.length
  console.log(data_index)
  // for(let i = 0 ; i < data_index ; i++){

  // }
  
  console.log('recordSeeder.js has been created')
})

