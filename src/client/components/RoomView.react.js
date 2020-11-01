// @flow
import type { Room, Socket } from '../../common/types';
import { joinTeam } from '../utils/EventHandlers';

import React from 'react';
import TeamList from './TeamList.react';
import Button from "./Button.react";

type Props = {
  userId: string,
  conn: Socket,
  roomState: Room,
  setRoomState: (Room) => void,
};

export default function RoomView(props: Props): React.Node {
  const { userId, conn, roomState, setRoomState } = props;
  return (
    <div className="roomWrapper">
      <h1 className="roomHeader">Room Code: {roomState.id}</h1>
      <Button
        label="Join Team A"
        onClick={() => {
          console.log(`${roomState.id}: request player ${userId} to join Team A`)
          joinTeam(conn, userId, roomState.id, 'A', setRoomState)
        }}
      />
      <Button
        label="Join Team B"
        onClick={() => {
          console.log(`${roomState.id}: request player ${userId} to join Team B`)
          joinTeam(conn, userId, roomState.id, 'B', setRoomState)
        }}
      />
      <TeamList isTeamA={true} members={roomState.teamA.teamPlayerList} />
      <TeamList isTeamA={false} members={roomState.teamB.teamPlayerList} />
    </div>
  );
}
