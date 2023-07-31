import init from './scripts/init.js'
init()

import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'
import { engine } from 'express-handlebars'
import viewsRoutes from './routes/views/routes.js'
import socketioMiddlewares from './websockets/middlewares.js'
import { registerSocketioHandlers } from './websockets/main.js'
import cnf from './cnf.js'

const app = express()

// Basic express conf
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(cnf.staticFilesDir))

// Template engine conf
app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', cnf.viewsDir)

// App routes conf
app.use('/', viewsRoutes)

// Socket.io conf
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: '*'
  }
})
io.use(socketioMiddlewares.validateUser)
registerSocketioHandlers(io)

export default httpServer
