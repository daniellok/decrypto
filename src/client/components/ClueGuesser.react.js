// @flow

import React, { useState } from 'react';
import Button from './Button.react';

type Props = {
  clue: string,
  currentGuess: number,
  setGuess: (number) => void,
  //  teamGuesses: Array<Array<number>>,
};

export default function ClueGuesser(props: Props): React.Node {
  const { clue, currentGuess, setGuess } = props;

  return (
    <div className="flexColumn justifyCenter clueGuessWrapper marginBetween">
      <div className="clueLabel">{clue}</div>
      <div className="flexRow">
        {[1, 2, 3, 4].map((num) => {
          let className = 'guessButton';
          if (num === currentGuess) {
            className += ' active';
          }

          return (
            <Button
              key={`${clue}.${num}`}
              className={className}
              label={String(num)}
              onClick={() => setGuess(num)}
            />
          );
        })}
      </div>
    </div>
  );
}
