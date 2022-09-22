const mongoose = require('mongoose')
const Record = require('../record')
const mahjongScoreRecords = require('./mahjong-score-record.json')
const data = mahjongScoreRecords.GameData // 過去的遊戲資料

const db = require('../../config/mongoose')

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
  console.log('recordSeeder.js has been created, PRESS ^c for exit')
})

