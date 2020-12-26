// @flow
import type { Room, Socket } from '../../common/types';

import React, { useState, useEffect } from 'react';
import LandingView from './LandingView.react';
import LobbyView from './LobbyView.react';
import RoomView from './RoomView.react';
import * as io from 'socket.io-client';
import { SocketGameEvents } from '../../common/events';

type Props = {};

// TODO: handle serverside disconnect, see:
// https://socket.io/docs/client-api/#Event-%E2%80%98disconnect%E2%80%99

type ViewType = 'landing' | 'lobby' | 'room';

function getView(roomState: ?Room): ViewType {
  if (roomState == null) {
    return 'landing';
  }

  if (roomState.phase === 'init') {
    return 'lobby';
  }

  return 'room';
}

function MainPage(props: Props): React.Node {
  const [userId, setUserId] = useState('');
  const [roomId, setRoomId] = useState('');
  const [conn, setConn] = useState();
  const [roomState, setRoomState] = useState();

  // init connection on intial render
  useEffect(() => {
    const socket = io();
    socket.on(SocketGameEvents.STATE_UPDATE, (data) => {
      console.log('received a push state update', data);
      setRoomState(data.roomState);
    });
    setConn(socket);
  }, []);

  const viewType = getView(roomState);

  switch (viewType) {
    case 'landing':
      return (
        <LandingView
          userId={userId}
          setUserId={setUserId}
          conn={conn}
          setRoomState={setRoomState}
          roomId={roomId}
          setRoomId={setRoomId}
        />
      );
    case 'lobby':
      return (
        <LobbyView
          userId={userId}
          conn={conn}
          roomState={roomState}
          setRoomState={setRoomState}
        />
      );
    case 'room':
      return <RoomView userId={userId} conn={conn} roomState={roomState} />;
  }
}

export default MainPage;
