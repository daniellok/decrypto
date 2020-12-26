// @flow
import type { Room, Socket } from '../../common/types';
import React, { useState } from 'react';
import WordBox from './WordBox.react';

type Props = {
  userId: string,
  conn: Socket,
  roomState: Room,
};

export default function RoomView(props: Props): React.Node {
  const { userId, conn, roomState, setRoomState } = props;
  const team = userId in roomState.teamA.teamPlayerList ? 'A' : 'B';
  const words = team === 'A' ? roomState.teamA.words : roomState.teamB.words;
  const wordDisplays = words.map((word, idx) => (
    <WordBox key={word} idx={idx} word={word} />
  ));

  return (
    <div className="roomWrapper centered">
      <div className="wordDisplaysWrapper">{wordDisplays}</div>
    </div>
  );
}
