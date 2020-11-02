// @flow
import type { Room, Socket } from '../../common/types';

import TextInput from './TextInput.react';
import Button from './Button.react';
import { createRoom, joinRoom } from '../utils/EventHandlers';
import React, { useState } from 'react';


type Props = {
  userId: string,
  setUserId: (string) => void,
  conn: Socket,
  setRoomState: (Room) => void,
  roomId: string,
  setRoomId: (string) => void,
};

export default function LandingView(props: Props): React.Node {
  const { userId, setUserId, conn, setRoomState, roomId, setRoomId } = props;
  const [errorMessage, setErrorMessage] = useState('');

  function validateUsername(userId: string): boolean {
    if (userId === '') {
      setErrorMessage('Please choose a username!');
      return false;
    }
    return true;
  }

  async function onCreateClick(): void {
    console.log(`Create New request from userId: ${userId}`);
    if (validateUsername(userId)) {
     const roomState = await createRoom(conn, userId);
     setRoomState(roomState);
    }
  }

  async function onJoinClick(): void {
    console.log(`Join Existing request from ${userId} for room ${roomId}`);
    if (validateUsername(userId)) {
      const response = await joinRoom(conn, userId, roomId);
      if (response.error) {
        console.log(`Join Existing failed: ${response.error}`)
        setErrorMessage(response.error);
        return;
      }
      setRoomState(response.roomState)
    }
  }

  return (
    <div className="centered">
      <p className="error">{errorMessage}</p>
      <h2>Enter username here:</h2>
      <TextInput value={userId} setValue={setUserId} />
      <h1>Hello {userId}</h1>
      <br />
      <h2>What would you like to do?</h2>
      <Button label="Create New Game" onClick={onCreateClick} />
      <br />
      <h2>Enter room code here: {roomId}</h2>
      <TextInput value={roomId} setValue={setRoomId} />
      <Button label="Join Existing Game" onClick={onJoinClick} />
    </div>
  );
}
