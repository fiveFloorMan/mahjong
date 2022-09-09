const express = require('express')
const router = express.Router()

const Record = require('../../models/record.js')
router.get('/addRecord', (req, res) => {
  res.render('addRecord')
})

router.post('/addRecord', (req, res) => {
  const record = req.body
  console.log('req.body', req.body)
})

module.exports = router