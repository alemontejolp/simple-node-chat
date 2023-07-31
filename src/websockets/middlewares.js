import usersDataAccess from '../data_access/users.js'

export function validateUser(socket, next) {
  console.log('Socket: validating user')
  let userId = socket.handshake.auth?.userId
  if (!userId) {
    return next(new Error('User id is missing'))
  }
  let userInfo = usersDataAccess.getUserById(userId)
  if (!userInfo.fok) {
    return next(new Error(userInfo.message || 'Error while retriving the user in authentication'))
  }
  socket.data.user = userInfo.user
  next()
}

export default {
  validateUser
}
