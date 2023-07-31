import { Router } from "express";
import pipelines from "./pipelines.js";

const router = Router()

router.get('/', pipelines.index)
router.get('/signup', pipelines.signup)
router.get('/signin', pipelines.signin)
router.post('/signin', pipelines.authenticate)
router.post('/signup', pipelines.createUser)
router.get('/chat', pipelines.showChatDashboard)
router.get('/join-room', pipelines.joinRoom)
router.post('/create-room', pipelines.createRoom)

export default router
