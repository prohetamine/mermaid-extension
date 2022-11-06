const express           = require('express')
    , app               = express()
    , http              = require('http')
    , server            = http.createServer(app)
    , cors              = require('cors')
    , path              = require('path')
    , bodyParser        = require('body-parser')
    , { Server }        = require('socket.io')
    , base64            = require('base-64')

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

app.use(cors())
app.use(bodyParser.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  next()
})

app.get('/events', (req, res) => {
  console.log(req.query)

  res.setHeader('Access-Control-Allow-Origin', '*')

  res.send(
    JSON.stringify([{
      delay: 500,
      text: 'hello!'
    }])
  )
})

io.on('connection', socket => {
  setInterval(() => {
    io.sockets.emit('chat-chaturbate', [{ text: `WebSocket date: ${(d => `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`)(new Date())}`, delay: 0 }])
  }, 5000)
})



app.listen(8888)
