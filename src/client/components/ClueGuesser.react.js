// @flow

import React, { useState } from 'react';
import Button from './Button.react';

type Props = {
  clue: string,
  setGuess: (number) => void,
  //  teamGuesses: Array<Array<number>>,
};

export default function ClueGuesser(props: Props): React.Node {
  const { clue, setGuess } = props;

  return (
    <div className="flexColumn justifyCenter clueGuessWrapper marginBetween">
      <div className="clueLabel">{clue}</div>
      <div className="flexRow">
        {[1, 2, 3, 4].map((num) => (
          <Button
            className="guessButton"
            label={String(num)}
            onClick={() => setGuess(num)}
          />
        ))}
      </div>
    </div>
  );
}
