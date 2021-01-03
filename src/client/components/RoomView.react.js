// @flow
import type { Room, Socket } from '../../common/types';
import { getTeamForUser } from '../utils/utils';
import React, { useState } from 'react';

import WordBox from './WordBox.react';
import EncodingSubview from './EncodingSubview.react';
import WaitingSubview from './WaitingSubview.react';

type Props = {
  userId: string,
  conn: Socket,
  roomState: Room,
  setRoomState: (Room) => void,
};

export default function RoomView(props: Props): React.Node {
  const { userId, conn, roomState, setRoomState } = props;
  const team = getTeamForUser(userId, roomState);
  const words = team.words;
  const isCodemaster = team.codemaster === userId;

  const wordDisplays = words.map((word, idx) => (
    <WordBox key={word} idx={idx} word={word} />
  ));

  const subview = isCodemaster ? (
    <EncodingSubview
      userId={userId}
      conn={conn}
      roomState={roomState}
      setRoomState={setRoomState}
    />
  ) : (
    <WaitingSubview />
  );

  return (
    <div className="roomWrapper centered">
      <div className="flexRow">{wordDisplays}</div>
      {subview}
    </div>
  );
}
