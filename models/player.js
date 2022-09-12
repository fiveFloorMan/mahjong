const mongoose = require('mongoose')
const Schema = mongoose.Schema

const playerSchema = new Schema({
  playerName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
  },
})

module.exports = mongoose.model('Player', playerSchema)