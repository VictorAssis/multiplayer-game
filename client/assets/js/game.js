export function createGame () {
  const state = {
    players: {},
    fruits: {},
    screen: {
      width: 10,
      height: 10
    }
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