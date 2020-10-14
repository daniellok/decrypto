// @flow

import React, { useState } from 'react';
import Button from './Button.react';
import TextInput from './TextInput.react';
import * as io from 'socket.io-client';
import { SocketGameEvents } from '../common/events';

const styles = require('./styles.css');

type Props = {};

// TODO: handle serverside disconnect (see: https://socket.io/docs/client-api/#Event-%E2%80%98disconnect%E2%80%99)

function initConnection(userId: string) {
  // TODO: need to move init connection out of this function,
  // otherwise you can only join a room if you've pressed create before
  const socket = io();
  console.log('socket init success');
  socket.emit(SocketGameEvents.CREATE_ROOM, userId);
  console.log('emit create room', SocketGameEvents.CREATE_ROOM, userId);
  return socket;
}

  // TODO: proper typing for conn
function joinRoom(conn, userId: string, roomId: string) {
  conn.emit(SocketGameEvents.JOIN_ROOM, userId, roomId)
}

function MainPage(props: Props): React.Node {
  const [userId, setUserId] = useState('');
  const [roomId, setRoomId] = useState('');
  const [conn, setConn] = useState();
  return (
    <div className="centered">
      <h2>Enter username here:</h2>
      <TextInput value={userId} setValue={setUserId} />
      <h1>Hello {userId}</h1>
      <br/>
      <h2>What would you like to do?</h2>
      <Button
        label="Create New Game"
        onClick={() => {
          console.log(`Create New request from userId: ${userId}`);
            // TODO: proper onClick input validation
            if (userId == '') {
              alert("userID cannot be blank");
              return;
            }
          setConn(initConnection(userId));
        }}
      />
      <br/>
      <h2>Enter room code here: {roomId}</h2>
      <TextInput value={roomId} setValue={setRoomId} />
      <Button
        label="Join Existing Game"
        onClick={() => {
          console.log(`Join Existing request from ${userId} for room ${roomId}`);
          joinRoom(conn, userId, roomId);
        }}
      />
    </div>
  );
}

export default MainPage;
