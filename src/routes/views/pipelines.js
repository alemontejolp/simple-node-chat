import controllers from "./controllers.js";

export default {
  index: [
    controllers.index
  ],
  signup: [
    controllers.signup
  ],
  signin: [
    controllers.signin
  ],
  authenticate: [
    controllers.authenticate
  ],
  createUser: [
    controllers.createUser
  ],
  showChatDashboard: [
    controllers.showDashboard
  ],
  joinRoom: [
    controllers.joinRoom
  ],
  createRoom: [
    controllers.createRoom
  ]
}
