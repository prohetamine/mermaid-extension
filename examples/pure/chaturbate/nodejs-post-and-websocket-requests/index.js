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

  if (req.query.data.match('username: ')) {
    res.send(
      JSON.stringify([{
        delay: 500,
        text: 'hello!'
      }])
    )
  } else {
    res.send(
      JSON.stringify([])
    )
  }
})

io.on('connection', socket => {
  setInterval(() => {
    socket.emit('chat-chaturbate', [{ text: `WebSocket date: ${(d => `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`)(new Date())}`, delay: 0 }])
  }, 5000)
})

server.listen(8888)
