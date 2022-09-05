const mongoose = require('mongoose')
const Schema = mongoose.Schema
const playerSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  experience: {
    type: Number,
  },
  location: {
    type: Map,
    of: String
  }
})

module.exports = mongoose.model('Player', playerSchema)