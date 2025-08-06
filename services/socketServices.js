import { Server } from 'socket.io';
import { handleSocketConnection } from '../controller/roomsController.js';

let io;

export const createSocketServer = (app) => {
  const server = app.listen(app.get('port'), () => {
    console.log(`Socket server ready`);
  });

  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    handleSocketConnection(io, socket);
  });

  return io;
};

export const getIO = () => {
  if (!io) throw new Error('Socket.io not initialized');
  return io;
};