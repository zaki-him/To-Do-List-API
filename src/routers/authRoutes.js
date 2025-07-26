import express from 'express'
import {addUser , loginUser} from '../controllers/userController.js'

const authRouter = express.Router()

//Register the user infos
authRouter.post('/register', addUser)
//login the user
authRouter.post('/login' , loginUser)

export default authRouter