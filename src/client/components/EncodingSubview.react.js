import type { Room, Socket } from '../../common/types';
import { getTeamForUser } from '../utils/utils';
import React, { useState } from 'react';
import TextInput from './TextInput.react';

type Props = {
  userId: string,
  conn: Socket,
  roomState: Room,
};

export default function EncodingSubview(props: Props): React.Node {
  const { userId, roomState } = props;
  const team = getTeamForUser(userId, roomState);
  const code = team.code;

  const [clues, setClues] = useState(['', '', '']);

  const codeInputs = code.map((item, idx) => {
    return (
      <div key={item} className="flexColumn marginBetween">
        <TextInput
          value={clues[idx]}
          setValue={(clue) => {
            const cluesCopy = [...clues];
            cluesCopy[idx] = clue;
            setClues(cluesCopy);
          }}
        />
        <div className="fontLarge">{item}</div>
      </div>
    );
  });

  return (
    <div>
      <div>You are the codemaster! Come up with clues.</div>
      <div className="flexRow">{codeInputs}</div>
    </div>
  );
}
