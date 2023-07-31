import db from "./sqlite.js";

export function createRoom(userOwnserId, roomName) {
  try {
    let query = 'INSERT INTO chat_rooms(room_name, user_owner_id) VALUES(@room_name, @user_owner_id)'
    let stmt = db.prepare(query)
    let info = stmt.run({ user_owner_id:userOwnserId, room_name:roomName })
    let fok = !!info.changes
    return {
      fok: fok,
      info: info
    }
  } catch(err) {
    switch(err.code) {
      default:
        throw err
    }
  }
}

export function getRooms() {
  try {
    let query = `SELECT id, room_name, user_owner_id FROM chat_rooms`
    let stmt = db.prepare(query)
    let rooms = stmt.all()
    return {
      fok: true,
      rooms
    }
  } catch(err) {
    switch(err.code) {
      default:
        throw err
    }
  }
}

export function getRoomById(roomId) {
  try {
    let query = `SELECT id, room_name, user_owner_id FROM chat_rooms WHERE id = @id`
    let stmt = db.prepare(query)
    let room = stmt.get({ id: roomId })
    if (!room) {
      return {
        fok: false,
        message: 'Room not found'
      }
    }
    return {
      fok: true,
      room
    }
  } catch(err) {
    switch(err.code) {
      default:
        throw err
    }
  }
}

export default {
  createRoom,
  getRooms,
  getRoomById
}
