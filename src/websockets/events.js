import roomsDataAccess from '../data_access/rooms.js'

export function registerEvents(io, socket) {
  const onJoinChatRoom = (data, cb) => {
    console.log('join chat room')
    let roomId = data.roomId
    if (!roomId) {
      return cb({
        code: 'room-id-missing',
        message: 'Room id is missing'
      })
    }
    let roomInfo = roomsDataAccess.getRoomById(roomId)
    if (!roomInfo.fok) {
      return cb({
        code: 'room-joining-failure',
        message: roomInfo.message
      })
    }
    socket.join(`chat-room:${roomId}`)
    cb({
      code: 'ok'
    })
  }

  const onNewMessage = (data, cb) => {
    if (!data.roomId) {
      return cb({
        code: 'room-id-missing',
        message: 'Room id is missing'
      })
    }
    const roomName = `chat-room:${data.roomId}`
    if (!socket.rooms.has(roomName)) {
      return cb({
        code: 'forbidden-room',
        message: 'The user is not in that room'
      })
    }
    console.log(socket.rooms)
    io.to(roomName).emit('new-message', {
      user: socket.data.user,
      message: data.message,
      roomId: data.roomId
    })
    return cb({
      code: 'ok'
    })
  }

  socket.on('join-chat-room', onJoinChatRoom)
  socket.on('new-message', onNewMessage)
}

export default registerEvents
