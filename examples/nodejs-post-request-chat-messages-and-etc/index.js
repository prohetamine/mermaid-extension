const express = require('express')
    , app = express()
    , cors = require('cors')
    , bodyParser = require('body-parser')

app.use(cors())

app.use(bodyParser.json())

app.post('/events', (req, res) => {
  console.log(req.body)

  res.setHeader('Access-Control-Allow-Origin', '*')
  res.send('ok')
})

app.listen(8888)
