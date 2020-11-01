// @flow
import type { Room, Socket } from '../../common/types.js';

import React, { useState, useEffect } from 'react';
import LandingView from './LandingView.react';
import RoomView from './RoomView.react';
import * as io from 'socket.io-client';
const styles = require('../styles.css');

type Props = {};

// TODO: handle serverside disconnect, see:
// https://socket.io/docs/client-api/#Event-%E2%80%98disconnect%E2%80%99

function MainPage(props: Props): React.Node {
  const [userId, setUserId] = useState('');
  const [roomId, setRoomId] = useState('');
  const [conn, setConn] = useState();
  const [roomState, setRoomState] = useState();

  // init connection on intial render
  useEffect(() => {
    const socket = io();
    setConn(socket);
  }, []);

  return roomState != null ? (
    <RoomView
        userId={userId}
        conn={conn}
        roomState={roomState}
        setRoomState={setRoomState}
    />
  ) : (
    <LandingView
      userId={userId}
      setUserId={setUserId}
      conn={conn}
      setRoomState={setRoomState}
      roomId={roomId}
      setRoomId={setRoomId}
    />
  );
}

export default MainPage;
