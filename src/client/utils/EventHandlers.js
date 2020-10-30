import type { Room, Socket } from '../../common/types';
import { SocketGameEvents } from '../../common/events';

export function createRoom(
  conn: Socket,
  userId: string,
  setRoomState: (Room) => void
): void {
  conn.emit(SocketGameEvents.CREATE_ROOM, userId, (roomState: Room) => {
    console.log('got room state from server: ', roomState);
    setRoomState(roomState);
  });
}

export function joinRoom(
  conn: Socket,
  userId: string,
  roomId: string,
  setRoomState: (Room) => void
): void {
  conn.emit(SocketGameEvents.JOIN_ROOM, userId, roomId, (res) => {
    if (res.error) {
      console.log('error when joining room:', res.error);
    } else {
      console.log('successfully joined room:', res.roomState);
      setRoomState(res.roomState);
    }
  });
}
