import { createGame } from './game.js'
import { createKeyboardListener } from './keyboard-listener.js'
import { renderScreen } from './render-screen.js'

const game = createGame()
const keyboardListener = createKeyboardListener(document)

const screen = document.getElementById('screen')
renderScreen(screen, game, requestAnimationFrame)

const socket = io()
socket.on('connect', () => {
  const playerId = socket.id
  console.log(`Player connected on Client with id: ${playerId}`)
})

socket.on('setup', (state) => {
  const playerId = socket.id
  game.setState(state)

  keyboardListener.registerPlayerId(playerId)
  keyboardListener.subscribe(game.movePlayer)
})
