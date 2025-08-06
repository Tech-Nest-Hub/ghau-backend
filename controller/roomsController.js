import Room from '../models/Room.js';
import { assignRoles } from '../utils/roleAssigner.js';
import { getIO } from '../services/socketServices.js';

const rooms = new Map();

export const handleSocketConnection = (io, socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('create_room', ({ roomId, playerName }) => {
    if (rooms.has(roomId)) {
      socket.emit('room_exists');
      return;
    }

    const room = new Room(roomId);
    rooms.set(roomId, room);
    const player = room.addPlayer(socket.id, playerName);
    
    socket.join(roomId);
    socket.emit('room_created', { roomId, playerId: socket.id, playerName });
  });

  socket.on('join_room', ({ roomId, playerName }) => {
    const room = rooms.get(roomId);
    if (!room) {
      socket.emit('room_not_found');
      return;
    }

    const player = room.addPlayer(socket.id, playerName);
    if (!player) {
      socket.emit('room_full');
      return;
    }

    socket.join(roomId);
    socket.emit('joined_room', { roomId, playerId: socket.id, playerName });
    io.to(roomId).emit('player_joined', { 
      players: room.players.map(p => ({ id: p.id, name: p.name })) 
    });
  });

  socket.on('start_game', ({ roomId }) => {
    const room = rooms.get(roomId);
    if (!room || room.gameState !== 'waiting') return;

    if (room.startGame()) {
      assignRoles(room);
      io.to(roomId).emit('game_started', {
        phase: room.phase,
        day: room.currentDay
      });
      
      // Send each player their role privately
      room.players.forEach(player => {
        io.to(player.id).emit('role_assigned', { role: player.role });
      });
    }
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    // Handle player disconnection from rooms
    rooms.forEach((room, roomId) => {
      if (room.players.some(p => p.id === socket.id)) {
        room.removePlayer(socket.id);
        io.to(roomId).emit('player_left', { playerId: socket.id });
      }
    });
  });
};