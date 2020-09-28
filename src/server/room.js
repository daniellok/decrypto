// @flow

import type { GamePhase } from '../common/types.js';

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

const defaultTeam: Team = {
  players: {},
  codemaster: null,
  words: [],
  code: [],
  clues: [],
  previousClues: [],
  wordGuesses: [],
};

export default class Room {
  // flow types for state
  id: string;
  teamA: Team;
  teamB: Team;
  phase: GamePhase;
  round: number;

  constructor(id: string) {
    this.id = id;
    this.teamA = { ...defaultTeam };
    this.teamB = { ...defaultTeam };
    this.phase = 'team-a-coding';
    this.round = 1;
  }
}
