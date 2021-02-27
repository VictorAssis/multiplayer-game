export function renderScreen (screen, game, requestAnimationFrame, currentPlayerId) {
  const context = screen.getContext('2d')
  context.fillStyle = 'white'
  context.clearRect(0, 0, 10, 10)
  for (const fruitId in game.state.fruits) {
    const fruit = game.state.fruits[fruitId]
    context.fillStyle = 'green'
    context.fillRect(fruit.x, fruit.y, 1, 1)
  }
  for (const playerId in game.state.players) {
    const player = game.state.players[playerId]
    context.fillStyle = playerId === currentPlayerId
      ? '#F0DB4F'
      : 'black'
    context.fillRect(player.x, player.y, 1, 1)
  }

  renderTable(game, currentPlayerId)

  requestAnimationFrame(() => {
    renderScreen(screen, game, requestAnimationFrame, currentPlayerId)
  })
}

function renderTable (game, currentPlayerId) {
  let htmlRows = ''
  for (const playerId in game.state.players) {
    const player = game.state.players[playerId]
    const rowClass = playerId === currentPlayerId
      ? ` class="current-player"`
      : ''
    htmlRows = `${htmlRows}<tr${rowClass}><td>${playerId}</td><td>${player.score}</td></tr>`
  }
  const tableBody = document.getElementById('results-body')
  tableBody.innerHTML = htmlRows
}
