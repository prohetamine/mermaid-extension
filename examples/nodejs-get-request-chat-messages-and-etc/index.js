const express = require('express')
    , app = express()
    , cors = require('cors')
    , bodyParser = require('body-parser')

app.use(cors())

app.get('/events', (req, res) => {
  console.log(req.query.platform)
  console.log(req.query.message)

  res.setHeader('Access-Control-Allow-Origin', '*')
  res.send('ok')
})

app.listen(8888)
