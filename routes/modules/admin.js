const express = require('express')
const router = express.Router()

router.get('/addRecord', (req, res) => {
  res.render('addRecord')
})



module.exports = router