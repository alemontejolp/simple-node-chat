import usersDataAccess from '../../data_access/users.js'
import roomsDataAccess from '../../data_access/rooms.js'
import { handleErrorInRequest } from '../../common/error-handling.js'


export function index(req, res) {
  res.redirect('/signin')
}

export function signup(req, res) {
  res.render('login/signup', {
    title: 'Registrate'
  })
}

export function signin(req, res) {
  res.render('login/signin', {
    title: 'Iniciar sesión'
  })
}

export function authenticate(req, res) {
  try {
    let userInfo = usersDataAccess.getUserByCredentials(req.body.username, req.body.passwd)
    if (!userInfo.fok) {
      return res.render('login/signin', {
        message: 'User not found',
        title: 'Iniciar sesión'
      })
    }
    res.redirect(`/chat?user_id=${userInfo.user.id}`)
  } catch(err) {
    handleErrorInRequest(err, req, res)
  }
}

export function createUser(req, res) {
  try {
    let createInfo = usersDataAccess.createUser(req.body)
    if(!createInfo.fok) {
      return res.render('login/signup', {
        message: createInfo.message,
        title: 'Registrate'
      })
    }
    // Redirect to view of chats
    res.redirect(`/chat?user_id=${createInfo.info.lastInsertRowid}`)
  } catch(err) {
    handleErrorInRequest(err, req, res)
  }
}

export function showDashboard(req, res) {
  try {
    let roomsInfo = roomsDataAccess.getRooms()
    res.render('chat/dashboard', {
      rooms: roomsInfo.rooms,
      title: 'Dashboard'
    })
  } catch(err) {
    handleErrorInRequest(err, req, res)
  }
}

export function joinRoom(req, res) {
  let roomInfo = roomsDataAccess.getRoomById(req.query?.room_id)
  res.render('chat/room-view', {
    room: roomInfo.room,
    message: roomInfo.message,
    title: 'Sala de chat'
  })
}

export function createRoom(req, res) {
  try {
    let roomData = req.body
    let roomInfo = roomsDataAccess.createRoom(roomData.user_id, roomData.room_name)
    if (!roomInfo.fok) {
      let roomsInfo = roomsDataAccess.getRooms()
      return res.render('chat/dashboard', {
        rooms: roomsInfo.rooms,
        title: 'Dashboard'
      })
    }
    res.redirect(`/join-room?room_id=${roomInfo.info.lastInsertRowid}&user_id=${roomData.user_id}`)
  } catch(err) {
    handleErrorInRequest(err, req, res)
  }
}

export default {
  index,
  signup,
  signin,
  authenticate,
  createUser,
  showDashboard,
  joinRoom,
  createRoom
}
