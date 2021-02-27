import express from 'express'
import http  from 'http'

const app = express()
const server = http.createServer(app)

app.use(express.static('../client'))

const port = process.env.port || 3000
server.listen(port, () => {
  console.log(`> Server listening on port: ${port}`)
})
