const { SocketGameEvents } = require('../common/events');
const { generateCode, generateWords } = require('./utils/utils');

class Player {
  // TODO: determine if player disconnect message is sent as player id, or as conn id
  constructor(id, socketId) {
    this.id = id;
    this.active = true;
    this.socketId = socketId;
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
    this.teamA = JSON.parse(JSON.stringify({ ...defaultTeam, id: 'A' }));
    this.teamB = JSON.parse(JSON.stringify({ ...defaultTeam, id: 'B' }));
    this.phase = 'init';
    this.round = 1;
  }

  addPlayerToRoom(userId, socketId) {
    if (this.playerList[userId] != null && this.playerList[userId].active) {
      // This username already exists in the room and the player is active
      console.log(
        `ROOM ${this.id}: failed to add player ${userId} [already in playerList]`
      );
      return false;
    }
    this.playerList[userId] = new Player(userId, socketId);
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

  advancePhase() {
    const oddRound = this.round % 2 == 1;
    console.log('advancing phase', this.phase);

    switch (this.phase) {
      case 'init':
        console.log('inside init case');
        this.phase = 'encoding';
        break;
      case 'encoding':
        this.phase = oddRound ? 'team-a-guessing' : 'team-b-guessing';
        break;
      case 'team-a-guessing':
        // TODO: win logic
        if (oddRound) {
          this.phase = 'team-b-guessing';
        } else {
          this.phase = 'encoding';
          this.round += 1;
        }
        break;
      case 'team-b-guessing':
        // TODO: win logic
        if (oddRound) {
          this.phase = 'encoding';
          this.round += 1;
        } else {
          this.phase = 'team-a-guessing';
        }
        break;
      case 'tiebreaker-guess':
        this.phase = 'tiebreaker-reveal';
        break;
      case 'tiebreaker-reveal':
        // TODO: win logic
        break;
      case 'team-a-win':
      case 'team-b-win':
        this.phase = 'init';
        break;
    }
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

    this.teamA.codemaster = Object.keys(this.teamA.teamPlayerList)[0];
    this.teamA.words = words.slice(0, 4);
    this.teamA.code = generateCode();

    this.teamB.codemaster = Object.keys(this.teamB.teamPlayerList)[0];
    this.teamB.words = words.slice(4, 8);
    this.teamB.code = generateCode();
    this.advancePhase();
  }

  addCluesForTeam(clues, team) {
    let teamObj;
    let otherTeamObj;
    if (team === 'A') {
      teamObj = this.teamA;
      otherTeamObj = this.teamB;
    } else {
      teamObj = this.teamB;
      otherTeamObj = this.teamA;
    }

    // set clues for team
    teamObj.clues = [...clues];

    // check if other team has set their clues. if so, end phase
    if (otherTeamObj.clues.length !== 0) {
      this.advancePhase();
    }
  }
}

module.exports = {
  Room,
  Player,
};
