import express from 'express'
import http  from 'http'
import socketIo from 'socket.io'
const { createGame } = require('../client/assets/js/game.js')

const app = express()
const server = http.createServer(app)
const sockets = socketIo(server)

app.use(express.static('../client'))

const game = createGame()

game.subscribe((command) => {
  console.log(`> Emitting ${command.type}`)
  sockets.emit(command.type, command)
})

sockets.on('connection', (socket) => {
  const playerId = socket.id
  console.log(`> Player connected on Server with id: ${playerId}`)
  game.addPlayer({ playerId })
  if (Object.values(game.state.players).length === 1) {
    game.start()
  }

  socket.emit('setup', game.state)

  socket.on('disconnect', () => {
    game.removePlayer({ playerId })
    if (Object.values(game.state.players).length === 0) {
      game.stop()
    }
    console.log(`> Player disconnected: ${playerId}`)
  })

  socket.on('move-player', (command) => {
    command.playerId = playerId
    command.type = 'move-player'
    game.movePlayer(command)
  })
})

const port = process.env.port || 3000
server.listen(port, () => {
  console.log(`> Server listening on port: ${port}`)
})
