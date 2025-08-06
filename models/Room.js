import Player from './Player.js';

class Room {
  constructor(id) {
    this.id = id;
    this.players = [];
    this.gameState = 'waiting'; // waiting, playing, night, day, ended
    this.phase = 'night'; // or 'day'
    this.currentDay = 0;
  }

  addPlayer(playerId, playerName) {
    if (this.players.length >= 15) return false; // Max players
    const player = new Player(playerId, playerName);
    this.players.push(player);
    return player;
  }

  removePlayer(playerId) {
    this.players = this.players.filter(p => p.id !== playerId);
  }

  startGame() {
    if (this.players.length < 5) return false; // Min players
    this.gameState = 'playing';
    this.phase = 'night';
    this.currentDay = 1;
    return true;
  }

  nextPhase() {
    this.phase = this.phase === 'night' ? 'day' : 'night';
    if (this.phase === 'day') this.currentDay++;
  }
}

export default Room;