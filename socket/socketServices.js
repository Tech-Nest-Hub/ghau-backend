import { joinRoom } from "../room/roomsController.js";

export const socketConnection = (io) => io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    joinRoom(socket);


})
