const mongoose = require('mongoose')
const Reserve = require('../reserve')
const Player = require('../player.js')

mongoose.connect('mongodb+srv://harviehung:mahjong@mahjong.uo9sd2f.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('reserveSeeder is error')
})

db.once('open', () => {
  console.log('mongoose connected reserveSeeder.js')

  // plus 7 days
  let newDay = new Date()
  let plusDay = 7
  let gameDay = newDay.setDate(newDay.getDate() + plusDay)
  // create a game reserve after 7 days
  Reserve.create({
    gameName: "test game",
    openAdmin : "admin01",
    date: gameDay,
  })
  console.log('reserveSeeder.js has been created, PRESS ^c for exit')
})