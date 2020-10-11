// @flow

import React, { useState } from 'react';
import Button from './Button.react';
import TextInput from './TextInput.react';
import * as io from 'socket.io-client';
import { SocketGameEvents } from '../common/events';

const styles = require('./styles.css');

type Props = {};

function initConnection(userId: string) {
  // TODO: proper onClick input validation
  if (userId == '') {
    alert("userID cannot be blank");
    return false;
  }
  const socket = io();
  console.log('socket init success');
  socket.emit(SocketGameEvents.CREATE_ROOM, userId);
  console.log('emit create room', SocketGameEvents.CREATE_ROOM, userId);
  return socket;
}

function joinRoom(conn, userId: string, roomId: string) {
  conn.emit(SocketGameEvents.JOIN_ROOM, userId, roomId)
}

function MainPage(props: Props): React.Node {
  const [userId, setUserId] = useState('');
  const [conn, setConn] = useState();
  return (
    <div className="centered">
      <TextInput userId={userId} setUserId={setUserId} />
      <h1>Hello {userId}</h1>
      <h2>What would you like to do?</h2>
      <Button
        label="Create New Game"
        onClick={() => {
          console.log('Create New request from userId: ' + userId);
          setConn(initConnection(userId));
        }}
      />
      <Button
        label="Join Existing Game"
        onClick={() => {
          console.log('Join Existing');
        }}
      />
    </div>
  );
}

export default MainPage;
