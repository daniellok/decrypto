import type { Room, Socket } from '../../common/types';
import { SocketGameEvents } from '../../common/events';

export function createRoom(
  conn: Socket,
  userId: string,
  setRoomState: (Room) => void
): void {
  conn.emit(SocketGameEvents.CREATE_ROOM, userId, (roomState: Room) => {
    const state = JSON.parse(roomState);
    console.log('got room state from server: ', state);
    setRoomState(state);
  });
}
