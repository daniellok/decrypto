// @flow
import TextInput from "./TextInput.react";
import Button from "./Button.react";
import {createRoom, joinRoom} from "../utils/EventHandlers";
import React from "react";
import type {Room, Socket} from "../../common/types";

type Props = {
  userId: string,
  setUserId: (string) => void,
  conn: Socket,
  setRoomState: (Room) => void,
  roomId: string,
  setRoomId: (string) => void,
};

function LandingView(props: Props): React.Node {
  const {
    userId,
    setUserId,
    conn,
    setRoomState,
    roomId,
    setRoomId,
  } = props;

  return (
    <div className="centered">
      <h2>Enter username here:</h2>
      <TextInput value={userId} setValue={setUserId}/>
      <h1>Hello {userId}</h1>
      <br/>
      <h2>What would you like to do?</h2>
      <Button
          label="Create New Game"
          onClick={() => {
            console.log(`Create New request from userId: ${userId}`);
            // TODO: proper onClick input validation
            if (userId == '') {
              alert('userID cannot be blank');
              return;
            }
            createRoom(conn, userId, setRoomState);
          }}
      />
      <br/>
      <h2>Enter room code here: {roomId}</h2>
      <TextInput value={roomId} setValue={setRoomId}/>
      <Button
          label="Join Existing Game"
          onClick={() => {
            console.log(
                `Join Existing request from ${userId} for room ${roomId}`
            );
            joinRoom(conn, userId, roomId, setRoomState);
          }}
      />
    </div>
  );
}

export default LandingView;