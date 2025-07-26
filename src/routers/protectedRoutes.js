import express from 'express'
import { authorizeRoles, verifyToken } from '../middleware/authMiddleware.js'

const protectedRouter = express.Router()

protectedRouter.get('/profile' , verifyToken , (req , res) => {
  res.json({ message: 'Profile accessed' , user: req.user})
})

protectedRouter.get('/admin' , verifyToken , authorizeRoles(['admin']) , (req , res) => {
  res.json({message: 'Welcome , admin' , user: req.user})
})

export default protectedRouter