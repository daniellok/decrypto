// @flow
export type Socket = any;

export type Player = {
  id: string,
  active: boolean,
  conn: Socket,
};

export type Room = {
  id: string,
  teamA: Team,
  teamB: Team,
  phase: GamePhase,
  round: number,
  playerList: { [string]: Player },
};

export type Team = {
  teamPlayerList: { [string]: Player },
  codemaster: ?Player,
  words: Array<string>,
  code: Array<number>,
  clues: Array<string>,
  previousClues: Array<Array<string>>,
  wordGuesses: Array<string>,
};

export type RedactedTeam = {
  teamPlayerList: { [string]: Player },
  codemaster: Player,
  clues: Array<string>,
  previousClues: Array<Array<string>>,
};

export type GamePhase =
  | 'init'
  | 'encoding'
  | 'team-a-guessing'
  | 'team-b-guessing'
  | 'tiebreaker-guess'
  | 'tiebreaker-reveal'
  | 'team-a-win'
  | 'team-b-win';
