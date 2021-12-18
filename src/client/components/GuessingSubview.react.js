// @flow
import type { Room, Socket } from '../../common/types';
import { getOtherTeamForUser, getTeamForUser } from '../utils/utils';
import { updateGuess } from '../utils/EventHandlers';
import React, { useState } from 'react';

import Button from './Button.react';
import ClueGuesser from './ClueGuesser.react';

type Props = {
  conn: Socket,
  roomState: Room,
  userId: string,
};

export default function GuessingSubview(props: Props): React.Node {
  const { conn, roomState, userId } = props;
  const phase = roomState.phase;
  const [guesses, setGuesses] = useState([-1, -1, -1]);
  const [errorMessage, setErrorMessage] = useState();

  let clues;
  if (phase === 'team-a-guessing') {
    clues = roomState.teamA.clues;
  } else if (phase === 'team-b-guessing') {
    clues = roomState.teamB.clues;
  } else {
    return <div>If you see this please let Dan or Kai know.</div>;
  }

  const handleUpdateGuess = async (idx: number, guess: number) => {
    setErrorMessage(null);

    // if a user clicks on a button twice, unset the guess
    if (guesses[idx] === guess) {
      guesses[idx] = -1;
      updateGuess(conn, roomState.id, userId, guesses);
      return;
    }

    const newGuesses = [...guesses];
    newGuesses[idx] = guess;
    setGuesses(newGuesses);
    const response = await updateGuess(conn, roomState.id, userId, newGuesses);
    if (response.error != null) {
      setErrorMessage(response.error);
    }
  };

  const team = getTeamForUser(userId, roomState);
  const guessingForOwnTeam =
    (phase === 'team-a-guessing' && team === 'A') ||
    (phase === 'team-b-guessing' && team === 'B');
  const identifier = guessingForOwnTeam ? 'your' : 'the other';

  return (
    <div className="flexColumn">
      <div className="marginBetween">
        Here are the clues {identifier} codemaster has given! Click the buttons
        to guess which clue corresponds to which word. When you have reached a
        consensus as a team, click "Lock In".
      </div>
      <p className="error">{errorMessage}</p>
      <div className="flexRow justifyCenter">
        {clues.map((clue, idx) => (
          <ClueGuesser
            key={clue}
            clue={clue}
            currentGuess={guesses[idx]}
            setGuess={(guess) => {
              handleUpdateGuess(idx, guess);
            }}
          />
        ))}
      </div>
      <Button label="Lock In" onClick={() => console.log('Locked In!')} />
    </div>
  );
}
