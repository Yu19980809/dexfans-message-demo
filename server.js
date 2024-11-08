import next from 'next'
import { Server } from 'socket.io'
import { createServer } from 'http'

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 4943
const app = next({ dev, hostname, port })
const handler = app.getRequestHandler()

app.prepare().then(() => {
  const httpServer = createServer(handler)
  const io = new Server(httpServer)

  io.on('connection', (socket) => {
    socket.on('message:new', (conversationId) => {
      console.log('message:new', conversationId)
      io.emit(`message-${conversationId}:new`)
    })

    socket.on('message:update', (conversationId) => {
      console.log('message:update', conversationId)
      io.emit(`message-${conversationId}:update`)
    })
  })

  httpServer
    .once('error', (err) => {
      console.log(err)
      process.exit(1)
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`)
    })
})
