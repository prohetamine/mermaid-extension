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
      JSON.stringify([{ text: ':Helloguys', delay: 0 }])
      //JSON.stringify([{ text: 'hello', delay: 500 }, { text: ':Helloguys', delay: 500 }])
    )
  }
})

app.listen(8888)
