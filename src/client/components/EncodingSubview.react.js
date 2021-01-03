import type { Room, Socket } from '../../common/types';
import { getTeamForUser } from '../utils/utils';
import { finishEncoding } from '../utils/EventHandlers';
import React, { useState } from 'react';
import TextInput from './TextInput.react';
import Button from './Button.react';

type Props = {
  userId: string,
  conn: Socket,
  roomState: Room,
  setRoomState: (Room) => void,
};

export default function EncodingSubview(props: Props): React.Node {
  const { userId, conn, roomState, setRoomState } = props;
  const team = getTeamForUser(userId, roomState);
  const code = team.code;

  const [clues, setClues] = useState(['', '', '']);
  const [errorMessage, setErrorMessage] = useState();

  const onConfirmClick = async () => {
    if (clues.includes('')) {
      setErrorMessage('Please fill in all clues!');
      return;
    }
    const response = await finishEncoding(conn, roomState.id, team.id, clues);
    console.log(response);
  };

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
      <p className="error">{errorMessage}</p>
      <div className="flexRow">{codeInputs}</div>
      <Button label="Confirm" onClick={onConfirmClick} />
    </div>
  );
}
