// @flow
export type GamePhase =
  | 'team-a-coding'
  | 'team-a-guessing'
  | 'team-b-coding'
  | 'team-b-guessing'
  | 'tiebreaker-guess'
  | 'tiebreaker-reveal'
  | 'team-a-win'
  | 'team-b-win';
