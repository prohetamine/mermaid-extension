const express = require('express')
    , app = express()
    , cors = require('cors')
    , bodyParser = require('body-parser')

app.use(cors())

app.get('/events', (req, res) => {
  console.log(req.query.platform)
  console.log(req.query.message)

  res.setHeader('Access-Control-Allow-Origin', '*')

  if (req.query.message.length === 0) {
    res.send(
      JSON.stringify([])
    )
  }

  if (req.query.message.match(/(hello|hey)/)) {
    res.send(
      JSON.stringify([':Helloguys'])
      //JSON.stringify(['hello', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', ':Helloguys'])
    )
  }
})

app.listen(8888)
