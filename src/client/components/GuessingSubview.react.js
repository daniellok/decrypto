// @flow
import type { Room, Socket } from '../../common/types';
import { getOtherTeamForUser, getTeamForUser } from '../utils/utils';
import React, { useState } from 'react';

import Button from './Button.react';
import ClueGuesser from './ClueGuesser.react';

type Props = {
  roomState: Room,
  userId: string,
};

export default function GuessingSubview(props: Props): React.Node {
  const { roomState, userId } = props;
  const phase = roomState.phase;
  const [guesses, setGuesses] = useState([-1, -1, -1]);

  let clues;
  if (phase === 'team-a-guessing') {
    clues = roomState.teamA.clues;
  } else if (phase === 'team-b-guessing') {
    clues = roomState.teamB.clues;
  } else {
    return <div>If you see this please let Dan or Kai know.</div>;
  }

  return (
    <div className="flexColumn">
      <div className="marginBetween">
        Here are the clues your codemaster has given! Click the buttons to guess
        which clue corresponds to which word. When you have reached a consensus
        as a team, click "Lock In".
      </div>
      <div className="flexRow justifyCenter">
        {clues.map((clue, idx) => (
          <ClueGuesser
            clue={clue}
            setGuess={(guess) => {
              const newGuesses = [...guesses];
              newGuesses[idx] = guess;
              setGuesses(newGuesses);
            }}
          />
        ))}
      </div>
    </div>
  );
}
