const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Reserve = new Schema({
  openAdmin : {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  participatingPlayer: {
    type: Array,
    default: []
  }
})

module.exports = mongoose.model('Reserve', Reserve)