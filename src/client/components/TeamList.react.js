// @flow
import type { Player } from '../../common/types';
import React from 'react';

type Props = {
  isTeamA: boolean,
  members: { [string]: Player },
};

export default function TeamList(props: Props): React.Node {
  const { isTeamA, members } = props;
  return (
    <div
      className="playerListWrapper"
      style={{ float: isTeamA ? 'left' : 'right' }}
    >
      <h2>Team {isTeamA ? 'A' : 'B'}</h2>
      {Object.values(members).map((player: Player) => (
        <p>{player.id}</p>
      ))}
    </div>
  );
}
