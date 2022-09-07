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
    // 呈現方式要與mahjong-score-record.json相同 ex: "1-Feb"
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