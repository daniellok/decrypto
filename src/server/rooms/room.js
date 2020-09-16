export default class Room {
  constructor(id) {
    this.id = id;
    this.teamA = {
      players: [],
      words: [],
      pastClues: [[], [], [], []],
    };
    this.teamB = {
      players: [],
      words: [],
      pastClues: [[], [], [], []],
    };
  }
}
