import db from "./sqlite.js";

export function createUser(user) {
  try {
    let query = `INSERT INTO users(username, passwd) VALUES(@username, @passwd)`
    let stmt = db.prepare(query)
    let info = stmt.run(user)
    return {
      fok: true,
      info
    }
  } catch(err) {
    switch(err.code) {
      case 'SQLITE_CONSTRAINT_UNIQUE':
        return {
          fok: false,
          message: err.message
        }
      default:
        throw err
    }
  }
}

export function getUserById(userId) {
  try {
    let query = `SELECT id, username FROM users WHERE id = @id`
    let stmt = db.prepare(query)
    let user = stmt.get({id: userId})
    if (!user) {
      return {
        fok: false,
        message: 'User not found.'
      }
    }
    return {
      fok: true,
      user
    }
  } catch(err) {
    switch(err.code) {
      default:
        throw err
    }
  }
}

export function getUserByCredentials(username, passwd) {
  try {
    let query = `SELECT id, username FROM users WHERE username = @username AND passwd = @passwd`
    let stmt = db.prepare(query)
    let user = stmt.get({ username, passwd })
    if (!user) {
      return {
        fok: false,
        message: 'User not found.'
      }
    }
    return {
      fok: true,
      user
    }
  } catch(err) {
    switch(err.code) {
      default:
        throw err
    }
  }
}

export default {
  createUser,
  getUserById,
  getUserByCredentials
}
