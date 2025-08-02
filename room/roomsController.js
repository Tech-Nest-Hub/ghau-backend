export const joinRoom = (socket)  => {
    socket.on("join_room", (data)=> {
        socket.join(data)
    })
    socket.on("send_message", (data)=>  {
        socket.to(data.room).emit("receive_message", data)
    })
}
export const leaveRoom = (socket)  => {
      socket.on("leave_room", (data)=> {
        socket.leave(data)
    })
}