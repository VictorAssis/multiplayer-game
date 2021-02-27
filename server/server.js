const express = require('express')
const http = require('http')

const app = express()
const server = http.createServer(app)

app.use(express.static('../client'))

const port = process.env.port || 3000
server.listen(port, () => {
  console.log(`> Server listening on port: ${port}`)
})
