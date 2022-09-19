const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({
  playerName: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  gameTimes: {
    type: Number,
    required: true
  },
  special: {
    type: String
  }
})

module.exports = mongoose.model('Record', recordSchema)