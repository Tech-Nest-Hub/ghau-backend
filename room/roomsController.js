export const joinRoom = (socket) => {
    socket.on("join_room", (roomId) => {
        socket.join(roomId);
        console.log(`User ${socket.id} joined room: ${roomId}`);
        // Optionally notify others in room
        socket.to(roomId).emit("user_joined", { id: socket.id });
    });
    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data)
    })
    
}
export const leaveRoom = (socket) => {
    socket.on("leave_room", (data) => {
        socket.leave(data)
    })
}