import { registerEvents } from './events.js'

export function registerSocketioHandlers(io) {
  io.on('connection', socket => {
    console.log('Socket connected:')
    console.log(socket.data)

    registerEvents(io, socket)
  })
}

export default {
  registerSocketioHandlers
}
