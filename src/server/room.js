const { SocketGameEvents } = require('../common/events');
const { generateCode, generateWords } = require('./utils/utils');

class Player {
  // TODO: determine if player disconnect message is sent as player id, or as conn id
  constructor(id /*: string*/) {
    this.id = id;
    this.active = true;
  }
}

const defaultTeam /* : Team */ = {
  teamPlayerList: {},
  codemaster: null,
  words: [],
  code: [],
  clues: [],
  previousClues: [],
  wordGuesses: [],
};

class Room {
  /* flow types for state
  id: string;
  teamA: Team;
  teamB: Team;
  phase: GamePhase;
  round: number; 
  */

  constructor(id) {
    this.id = id;
    this.playerList = {};
    this.teamA = JSON.parse(JSON.stringify(defaultTeam));
    this.teamB = JSON.parse(JSON.stringify(defaultTeam));
    this.phase = 'init';
    this.round = 1;
  }

  addPlayerToRoom(userId) {
    if (this.playerList[userId] != null && this.playerList[userId].active) {
      // This username already exists in the room and the player is active
      console.log(
        `ROOM ${this.id}: failed to add player ${userId} [already in playerList]`
      );
      return false;
    }
    this.playerList[userId] = new Player(userId);
    console.log(`ROOM ${this.id}: added ${userId} to room`);
    return true;
  }

  addPlayerToTeam(userId, teamId) {
    if (this.playerList[userId] == null) {
      // userId does not exist in this room
      // TODO: activity check?
      console.log(
        `ROOM ${this.id}: failed to add player ${userId} to team ${teamId} [userId not in room]`
      );
      return false;
    }

    // Remove player from other team and add to this team
    const team = teamId === 'A' ? this.teamA : this.teamB;
    const otherTeam = teamId === 'A' ? this.teamB : this.teamA;
    delete otherTeam.teamPlayerList[userId];
    team.teamPlayerList[userId] = this.playerList[userId];
    console.log(`ROOM ${this.id}: added ${userId} to ${teamId}`);
    return true;
  }

  startGame() {
    // TODO: error handling, e.g. not all users joined teams
    const words = generateWords();

    // TODO: set codemasters as first player of each team
    this.teamA.words = words.slice(0, 4);
    this.teamA.code = generateCode();
    this.teamB.words = words.slice(4, 8);
    this.teamB.code = generateCode();
    this.phase = 'encoding';
    return true;
  }
}

module.exports = {
  Room,
  Player,
};
