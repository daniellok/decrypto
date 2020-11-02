// @flow
import type { Player } from '../../common/types';
import React from 'react';
import Button from './Button.react';

type Props = {
  isTeamA: boolean,
  members: { [string]: Player },
  onJoinTeamClick: (string) => void,
};

export default function TeamList(props: Props): React.Node {
  const { isTeamA, members, onJoinTeamClick } = props;
  const teamId = isTeamA ? 'A' : 'B';

  return (
    <div
      className="teamListWrapper"
      style={{ float: isTeamA ? 'left' : 'right' }}>
      <div className="teamListHeader">
        <h2>Team {teamId}</h2>
        <Button
          className="teamListButton"
          label="Join Team"
          onClick={() => onJoinTeamClick(teamId)}
        />
      </div>
      {Object.values(members).map((player: Player) => (
        <p key={player.id}>{player.id}</p>
      ))}
    </div>
  );
}
