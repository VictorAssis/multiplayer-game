const screen = document.getElementById('screen')
const context = screen.getContext('2d')

const game = {
  players: {
    'player1': { x: 1, y: 1 },
    'player2': { x: 9, y: 9}
  },
  fruits: {
    'fruit1': { x: 3, y: 1 }
  }
}

function createKeyboardListener () {
  const state = {
    observers: []
  }

  function subscribe (observerFunction) {
    state.observers.push(observerFunction)
  }

  function notifyAll (command) {
    console.log(`Notifying ${state.observers.length} observers.`)
    for (const observerFunction of state.observers) {
      observerFunction(command)
    }
  }

  document.addEventListener('keydown', handleKeydown)

  function handleKeydown (event) {
    const keyPressed = event.key
    const command = {
      playerId: 'player1',
      keyPressed
    }
    notifyAll(command)
  }

  return {
    subscribe
  }
}
const keyboardListener = createKeyboardListener()

function renderScreen () {
  context.fillStyle = 'white'
  context.clearRect(0, 0, 10, 10)
  for (const playerId in game.players) {
    const player = game.players[playerId]
    context.fillStyle = 'black'
    context.fillRect(player.x, player.y, 1, 1)
  }
  for (const fruitId in game.fruits) {
    const fruit = game.fruits[fruitId]
    context.fillStyle = 'green'
    context.fillRect(fruit.x, fruit.y, 1, 1)
  }

  requestAnimationFrame(renderScreen)
}
renderScreen()
