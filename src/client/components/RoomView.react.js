// @flow
import type { Room, Socket } from '../../common/types';
import { getTeamForUser } from '../utils/utils';
import React, { useState } from 'react';

import WordBox from './WordBox.react';
import EncodingSubview from './EncodingSubview.react';
import GuessingSubview from './GuessingSubview.react';
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
  const phase = roomState.phase;

  const wordDisplays = words.map((word, idx) => (
    <WordBox key={word} idx={idx} word={word} />
  ));

  let subview;
  switch (phase) {
    case 'encoding':
      if (isCodemaster) {
        if (team.clues.length !== 0) {
          subview = (
            <div>Submitted! Wait for other team to submit their clues.</div>
          );
        } else {
          subview = (
            <EncodingSubview
              userId={userId}
              conn={conn}
              roomState={roomState}
              setRoomState={setRoomState}
            />
          );
        }
      } else {
        // normal people just wait in this phase
        <WaitingSubview />;
      }
      break;
    case 'team-a-guessing':
      if (isCodemaster && team.id == 'A') {
        subview = <div>Pray that your team gets it right.</div>;
      } else {
        subview = (
          <GuessingSubview conn={conn} roomState={roomState} userId={userId} />
        );
      }
      break;
    case 'team-b-guessing':
      if (isCodemaster && team.id == 'B') {
        subview = <div>Pray that your team gets it right.</div>;
      } else {
        subview = (
          <GuessingSubview conn={conn} roomState={roomState} userId={userId} />
        );
      }
      break;
    default:
      subview = <div>Not Implemented Yet</div>;
  }

  return (
    <>
      <div className="roomCodeDisplay">{roomState.id}</div>
      <div className="roomWrapper centered">
        <div className="flexRow">{wordDisplays}</div>
        {subview}
      </div>
    </>
  );
}
