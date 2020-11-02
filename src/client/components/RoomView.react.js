// @flow
import type { Room, Socket } from '../../common/types';
import { joinTeam } from '../utils/EventHandlers';

import React from 'react';
import TeamList from './TeamList.react';
import Button from './Button.react';

type Props = {
  userId: string,
  conn: Socket,
  roomState: Room,
  setRoomState: (Room) => void,
};

export default function RoomView(props: Props): React.Node {
  const { userId, conn, roomState, setRoomState } = props;

  function onJoinTeamClick(teamId: string): void {
    console.log(
      `${roomState.id}: request player ${userId} to join Team ${teamId}`
    );
    joinTeam(conn, userId, roomState.id, teamId, setRoomState);
  }

  return (
    <div className="roomWrapper">
      <h1 className="roomHeader">Room Code: {roomState.id}</h1>
      <Button label="Join Team A" onClick={() => onJoinTeamClick('A')} />
      <Button label="Join Team B" onClick={() => onJoinTeamClick('B')} />
      <TeamList isTeamA={true} members={roomState.teamA.teamPlayerList} />
      <TeamList isTeamA={false} members={roomState.teamB.teamPlayerList} />
    </div>
  );
}
