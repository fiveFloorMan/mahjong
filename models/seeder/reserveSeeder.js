const mongoose = require('mongoose')
const Reserve = require('../reserve')

const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('mongoose connected reserveSeeder.js')

  // plus 7 days
  let newDay = new Date()
  let plusDay = 7
  newDay.setDate(newDay.getDate() + plusDay)
  // 把data 改成 yyyy-mm-dd & typeOf String
  const newDayYear = newDay.getFullYear()
  let newDayMonth = newDay.getMonth() + 1
  const newDayDate = newDay.getDate()
  if(newDayMonth.length = 1){
    newDayMonth = `0${newDayMonth}`
  }
  const date = `${newDayYear}-${newDayMonth}-${newDayDate}`
  
  // create a game reserve after 7 days
  Reserve.create({
    gameName: "test game",
    openAdmin : "admin01",
    date: date,
    participatingPlayer: ["test1", "test2"]
  })
  console.log('reserveSeeder.js has been created, PRESS ^c for exit')
})