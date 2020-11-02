// @flow
import type { Room, Socket } from '../../common/types';
import React from 'react';
import TeamList from './TeamList.react';
import { joinTeam } from '../utils/EventHandlers';

type Props = {
  userId: string,
  conn: Socket,
  roomState: Room,
  setRoomState: (Room) => void,
};

export default function RoomView(props: Props): React.Node {
  const { userId, conn, roomState, setRoomState } = props;

  async function onJoinTeamClick(teamId: string): void {
    console.log(
      `${roomState.id}: request player ${userId} to join Team ${teamId}`
    );
    const response = await joinTeam(conn, userId, roomState.id, teamId);
    setRoomState(response.roomState);
  }

  return (
    <div className="roomWrapper">
      <h1 className="roomHeader">Room Code: {roomState.id}</h1>
      <TeamList
        isTeamA={true}
        members={roomState.teamA.teamPlayerList}
        onJoinTeamClick={onJoinTeamClick}
      />
      <TeamList
        isTeamA={false}
        members={roomState.teamB.teamPlayerList}
        onJoinTeamClick={onJoinTeamClick}
      />
    </div>
  );
}
