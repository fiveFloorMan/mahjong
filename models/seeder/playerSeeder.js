const mongoose = require('mongoose')
const Player = require('../player')

mongoose.connect('mongodb+srv://harviehung:mahjong@mahjong.uo9sd2f.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected playerSeeder.js')
  for(let i = 1; i < 5; i++){
    Player.create({
    playerName: `test${i}`,
    password: `test${i}`,
    experience: 10,
    isAdmin: false
  })
  }
  Player.create({
    playerName: 'admin01',
    password: 'admin01',
    experience: 10,
    isAdmin: true
  })
  console.log('playerSeeder.js has been created, PRESS ^c for exit')
})
