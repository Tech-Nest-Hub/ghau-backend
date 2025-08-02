import express from "express"
import http from 'http'
import { Server } from "socket.io"
import cors from 'cors'



const app = express();

app.use(cors())

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5713",
        methods: ["GET", "POST"]
    }
});


server.listen(8000, ()=> {
    console.log("Server is running on http://localhost:8000");
})