// @flow
import type { Room, Socket } from '../../common/types';

import React from 'react';
import TeamList from './TeamList.react';

type Props = {
  roomState: Room,
};

export default function RoomView(props: Props): React.Node {
  const { roomState } = props;
  return (
    <div className="roomWrapper">
      <h1 className="roomHeader">Room Code: {roomState.id}</h1>
      <TeamList isTeamA={true} members={roomState.teamA.players} />
      <TeamList isTeamA={false} members={roomState.teamB.players} />
    </div>
  );
}
