import express from 'express'
import { getAllNotes , getNote , createNote , updateNote , deleteNote } from '../controllers/noteController.js'
import { verifyToken } from '../middleware/authMiddleware.js'

const noteRouter = express.Router()

noteRouter.get('/' , verifyToken , getAllNotes)
noteRouter.get('/:id' , verifyToken , getNote)
noteRouter.post('/'  , verifyToken , createNote)
noteRouter.put('/:id' , verifyToken , updateNote)
noteRouter.delete('/:id' , verifyToken , deleteNote)

export default noteRouter