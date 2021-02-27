const screen = document.getElementById('screen')
const context = screen.getContext('2d')

function createGame () {
  const state = {
    players: {},
    fruits: {}
  }

  function addPlayer (command) {
    const {
      playerId,
      playerX,
      playerY
     } = command

     state.players[playerId] = {
       x: playerX,
       y: playerY
     }
  }

  function removePlayer({ playerId }) {
    delete state.players[playerId]
  }

  function movePlayer ({ keyPressed, playerId }) {
    const acceptedKeys = {
      ArrowUp (player) {
        if (player.y - 1 >= 0) {
          player.y--
        }
      },
      ArrowDown (player) {
        if (player.y + 1 < screen.height) {
          player.y++
        }
      },
      ArrowLeft (player) {
        if (player.x - 1 >= 0) {
          player.x--
        }
      },
      ArrowRight (player) {
        if (player.x + 1 < screen.width) {
          player.x++
        }
      }
    }
    const player = game.state.players[playerId]
    const handleFunction = acceptedKeys[keyPressed]
    if (player && handleFunction) {
      handleFunction(player)
      checkForFruitCollision(player)
    }
  }

  function checkForFruitCollision (player) {
    for (const fruitId in state.fruits) {
      const fruit = state.fruits[fruitId]
      if (player.x === fruit.x && player.y === fruit.y) {
        removeFruit({ fruitId })
      }
    }
  }

  function addFruit (command) {
    const {
      fruitId,
      fruitX,
      fruitY
     } = command

     state.fruits[fruitId] = {
       x: fruitX,
       y: fruitY
     }
  }

  function removeFruit({ fruitId }) {
    delete state.fruits[fruitId]
  }

  return {
    state,
    addPlayer,
    removePlayer,
    movePlayer,
    addFruit,
    removeFruit
  }
}
const game = createGame()

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
keyboardListener.subscribe(game.movePlayer)

function renderScreen () {
  context.fillStyle = 'white'
  context.clearRect(0, 0, 10, 10)
  for (const playerId in game.state.players) {
    const player = game.state.players[playerId]
    context.fillStyle = 'black'
    context.fillRect(player.x, player.y, 1, 1)
  }
  for (const fruitId in game.state.fruits) {
    const fruit = game.state.fruits[fruitId]
    context.fillStyle = 'green'
    context.fillRect(fruit.x, fruit.y, 1, 1)
  }

  requestAnimationFrame(renderScreen)
}
renderScreen()
