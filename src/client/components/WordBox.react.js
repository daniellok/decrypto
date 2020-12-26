// @flow

import React from 'react';

type Props = {
  idx: number,
  word: string,
};

export default function WordBox(props: Props): React.Node {
  return (
    <div className="wordBoxWrapper">
      <div className="wordBox">{props.word}</div>
      <div className="wordIdx">{props.idx}</div>
    </div>
  );
}
