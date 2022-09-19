const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Reserve = new Schema({
  gameName: {
    type: String,
    required: true
  },
  openAdmin: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  participatingPlayer: {
    type: Array,
    default: []
  }
})

module.exports = mongoose.model('Reserve', Reserve)