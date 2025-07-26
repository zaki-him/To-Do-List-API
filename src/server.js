import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
import connectDB from "./config/db.js";
import authRouter from "./routers/authRoutes.js";
import protectedRouter from "./routers/protectedRoutes.js";
import noteRouter from "./routers/notesRoutes.js";

dotenv.config();

const server = express();
const port = process.env.PORT

server.use(express.json());
server.use(cors())

server.use('/auth' , authRouter)
server.use('/user' , protectedRouter)
server.use('/notes' , noteRouter)

connectDB().then(() => {
  server.listen(port, () => {
    console.log("Server is listening");
  });
});
