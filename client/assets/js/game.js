export function createGame () {
  const state = {
    players: {},
    fruits: {},
    screen: {
      width: 10,
      height: 10
    }
  }

  const observers = []
  let interval = null

  function subscribe (observerFunction) {
    observers.push(observerFunction)
  }

  function notifyAll (command) {
    for (const observerFunction of observers) {
      observerFunction(command)
    }
  }

  function setState (newState) {
    Object.assign(state, newState)
  }

  function start () {
    if (interval) return
    const frequency = 2000
    interval = setInterval(addFruit, frequency)
  }

  function stop () {
    clearInterval(interval)
    interval = null
    state.fruits = {}
  }

  function addPlayer (command) {
    const {
      playerId,
      playerX,
      playerY
    } = command

    const x = playerX || Math.floor(Math.random() * state.screen.width)
    const y = playerY || Math.floor(Math.random() * state.screen.height)

    state.players[playerId] = {
      x,
      y,
      score: 0
    }

    notifyAll({
      type: 'add-player',
      playerId,
      playerX: x,
      playerY: y,
      score: 0
    })
  }

  function removePlayer({ playerId }) {
    delete state.players[playerId]

    notifyAll({
      type: 'remove-player',
      playerId
    })
  }

  function movePlayer (command) {
    notifyAll(command)

    const {
      keyPressed,
      playerId
    } = command

    const acceptedKeys = {
      ArrowUp (player) {
        if (player.y - 1 >= 0) {
          player.y--
        }
      },
      ArrowDown (player) {
        if (player.y + 1 < state.screen.height) {
          player.y++
        }
      },
      ArrowLeft (player) {
        if (player.x - 1 >= 0) {
          player.x--
        }
      },
      ArrowRight (player) {
        if (player.x + 1 < state.screen.width) {
          player.x++
        }
      }
    }
    const player = state.players[playerId]
    const handleFunction = acceptedKeys[keyPressed]
    if (player && handleFunction) {
      handleFunction(player)
      checkForFruitCollision(playerId)
    }
  }

  function checkForFruitCollision (playerId) {
    const player = state.players[playerId]
    for (const fruitId in state.fruits) {
      const fruit = state.fruits[fruitId]
      if (player.x === fruit.x && player.y === fruit.y) {
        removeFruit({ fruitId })
        state.players[playerId].score++
      }
    }
  }

  function addFruit (command) {
    if (!command) {
      command = {}
    }
    const {
      fruitId,
      fruitX,
      fruitY
    } = command

    const maxId = 100000000000
    const id = fruitId || Math.floor(Math.random() * maxId)
    const x = fruitX || Math.floor(Math.random() * state.screen.width)
    const y = fruitY || Math.floor(Math.random() * state.screen.height)

    state.fruits[id] = {
      x,
      y
    }

    notifyAll({
      type: 'add-fruit',
      fruitId: id,
      fruitX: x,
      fruitY: y
    })
  }

  function removeFruit({ fruitId }) {
    delete state.fruits[fruitId]

    notifyAll({
      type: 'remove-fruit',
      fruitId
    })
  }

  return {
    state,
    setState,
    start,
    stop,
    addPlayer,
    removePlayer,
    movePlayer,
    addFruit,
    removeFruit,
    subscribe
  }
}
