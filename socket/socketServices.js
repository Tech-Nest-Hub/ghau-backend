import { joinRoom, leaveRoom, privateDM } from "../room/roomsController.js";

export const socketConnection = (io) => io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("global_message", (data) => {  
        // Broadcast to everyone except sender
        socket.broadcast.emit("receive_message", {
            message: data,
            sender: socket.id
        });
        
        // Or to include the sender as well:
        // io.emit("receive_message", { message: data, sender: socket.id });
    });
    
    joinRoom(socket);
    leaveRoom(socket);
    privateDM(socket);
});
