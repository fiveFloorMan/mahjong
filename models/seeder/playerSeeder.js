const Player = require('../player')

const db = require('../../config/mongoose')

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
