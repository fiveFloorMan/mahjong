const express = require('express')
const router = express.Router()

const Record = require('../../models/record.js')
router.get('/addRecord', (req, res) => {
  res.render('addRecord')
})

router.post('/addRecord', (req, res) => {
  
})

module.exports = router