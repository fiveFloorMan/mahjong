const mongoose = require('mongoose')
const Record = require('../record')
const mahjongScoreRecords = require('./mahjong-score-record.json')
const data = mahjongScoreRecords.GameData // 過去的遊戲資料

mongoose.connect('mongodb+srv://harviehung:mahjong@mahjong.uo9sd2f.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('recordSeeder is error')
})

db.once('open', () => {
  console.log('mongoose connected recordSeeder.js')

  Promise.all(Array.from(data, singleData => {
    return Record.create({
      playerName: singleData.name,
      score: singleData.score,
      date: singleData.date,
      gameTimes: singleData.gameTimes,
      special: singleData.special
    })

  }))
  console.log('recordSeeder.js has been created')
})

