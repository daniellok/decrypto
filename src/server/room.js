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
    const words = generateWords();

    // check that all players have joined a team
    const playerCountA = Object.keys(this.teamA.teamPlayerList).length;
    const playerCountB = Object.keys(this.teamB.teamPlayerList).length;
    const playerCount = Object.keys(this.playerList).length;
    if (playerCountA + playerCountB !== playerCount) {
      throw 'Not all players have joined a team';
    }

    // check that each team has at least one player
    if (playerCountA === 0) {
      throw 'Team A does not have any players';
    }
    if (playerCountB === 0) {
      throw 'Team B does not have any players';
    }

    this.teamA.codeMaster = Object.keys(this.teamA.teamPlayerList)[0];
    this.teamA.words = words.slice(0, 4);
    this.teamA.code = generateCode();

    this.teamB.codeMaster = Object.keys(this.teamB.teamPlayerList)[0];
    this.teamB.words = words.slice(4, 8);
    this.teamB.code = generateCode();
    this.phase = 'encoding';
  }
}

module.exports = {
  Room,
  Player,
};
