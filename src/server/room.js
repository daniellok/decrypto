/* Uncomment when flow for server code is working

type Player = {
  id: string,
  active: boolean,
  conn: any,
};

type Team = {
  players: { [string]: Player },
  codemaster: ?Player,
  words: Array<string>,
  code: Array<number>,
  clues: Array<string>,
  previousClues: Array<Array<string>>,
  wordGuesses: Array<string>,
};

type Player = {
  id: string,
  active: boolean,
};

*/

const defaultTeam /* : Team */ = {
  players: {},
  codemaster: null,
  words: [],
  code: [],
  clues: [],
  previousClues: [],
  wordGuesses: [],
};

class Player {
  // TODO: determine if player disconnect message is sent as player id, or as conn id
  constructor(id /*: string*/) {
    this.id = id;
    this.active = true;
  }
}

class Room {
  /* flow types for state
  id: string;
  teamA: Team;
  teamB: Team;
  phase: GamePhase;
  round: number; 
  */

  constructor(id /* : string */) {
    this.id = id;
    this.playerList = {};
    this.teamA = { ...defaultTeam };
    this.teamB = { ...defaultTeam };
    this.phase = 'team-a-coding';
    this.round = 1;
  }

  addPlayerToRoom(userId /*: string */) {
    if ((this.playerList[userId] != null) && this.playerList[userId].active) {
      // This username already exists in the room and the player is active
      console.log(
        `ROOM ${this.id}: failed to add player ${userId}, already in playerList`
      );
      return false;
    }
    this.playerList[userId] = new Player(userId);
    console.log(`ROOM ${this.id}: added ${userId}`);
    return true;
  }

  addPlayerToTeam(userId /*: string */, team /*: Team */) {
    // TODO: implement team allocation
  }
}

module.exports = {
  Room,
};
