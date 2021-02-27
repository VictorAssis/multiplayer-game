import express from 'express'
import http  from 'http'
import socketIo from 'socket.io'
const { createGame } = require('../client/assets/js/game.js')

const app = express()
const server = http.createServer(app)
const sockets = socketIo(server)

app.use(express.static('../client'))

const game = createGame()

sockets.on('connection', (socket) => {
  const playerId = socket.id
  console.log(`> Player connected on Server with id: ${playerId}`)
  game.addPlayer({ playerId })

  socket.emit('setup', game.state)
})

const port = process.env.port || 3000
server.listen(port, () => {
  console.log(`> Server listening on port: ${port}`)
})
