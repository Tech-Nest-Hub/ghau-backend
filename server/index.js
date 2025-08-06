import express from "express"
import http from 'http'
import { Server } from "socket.io"
import cors from 'cors'
import { createSocketServer } from "../services/socketServices.js";



const app = express();
app.use(cors())

const server = http.createServer(app);

createSocketServer(app);

server.listen(8000, ()=> {
    console.log("Server is running on http://localhost:8000");
})