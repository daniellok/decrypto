// @flow
import type { Room, Socket } from '../../common/types';
import React, { useState } from 'react';
import TeamList from './TeamList.react';
import Button from './Button.react';
import { joinTeam, startGame } from '../utils/EventHandlers';

type Props = {
  userId: string,
  conn: Socket,
  roomState: Room,
  setRoomState: (Room) => void,
};

export default function LobbyView(props: Props): React.Node {
  const { userId, conn, roomState, setRoomState } = props;

  const [errorMessage, setErrorMessage] = useState();

  async function onJoinTeamClick(teamId: string): void {
    console.log(
      `${roomState.id}: request player ${userId} to join Team ${teamId}`
    );
    const response = await joinTeam(conn, userId, roomState.id, teamId);
    setRoomState(response.roomState);
  }

  async function onStartGameClick(): void {
    console.log(`${roomState.id}: request start game`);
    const response = await startGame(conn, roomState.id);
    console.log(`${roomState.id}: start response`, response);
    if (response.error != null) {
      setErrorMessage(response.error);
    } else {
      setRoomState(response.roomState);
    }
  }

  return (
    <div className="roomWrapper centered">
      <h1 className="roomHeader">Room Code: {roomState.id}</h1>
      <div>
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
      <Button label="Start Game" onClick={onStartGameClick} />
    </div>
  );
}
