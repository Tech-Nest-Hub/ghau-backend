class Player {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.role = null;
    this.isAlive = true;
    this.votes = 0;
    this.hasVoted = false;
  }

  assignRole(role) {
    this.role = role;
  }

  vote() {
    this.hasVoted = true;
  }

  resetVotes() {
    this.votes = 0;
    this.hasVoted = false;
  }
}

export default Player;