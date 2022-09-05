const mongoose = require('mongoose')
const Player = require('../player')

mongoose.connect('mongodb+srv://harviehung:mahjong@mahjong.uo9sd2f.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected playerSeeder.js')
  
  Player.create({
    name: 'test01',
    password: 'test01',
    experience: 10,
  })
})