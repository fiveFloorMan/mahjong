const mongoose = require('mongoose')
// const Record = require('../record')
const mahjongScoreRecords = require('./mahjong-score-record.json')

mongoose.connect('mongodb+srv://harviehung:mahjong@mahjong.uo9sd2f.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('recordSeeder is error')
})

db.once('open', () => {
  console.log('mongoose connected recordSeeder.js')
  console.log(mahjongScoreRecords.GameData[0].name)
  
})

