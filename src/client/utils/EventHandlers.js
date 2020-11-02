import type { Room, Socket } from '../../common/types';
import { SocketGameEvents } from '../../common/events';

export function createRoom(conn: Socket, userId: string): Promise<Room> {
  return new Promise((resolve) => {
    conn.emit(SocketGameEvents.CREATE_ROOM, userId, (response) => {
      console.log('got room state from server: ', response.roomState);
      resolve(response.roomState);
    });
  });
}

export function joinRoom(
  conn: Socket,
  userId: string,
  roomId: string
): Promise<Room> {
  return new Promise((resolve) => {
    conn.emit(SocketGameEvents.JOIN_ROOM, userId, roomId, (response) => {
      resolve(response);
    });
  });
}

export function joinTeam(
  conn: Socket,
  userId: string,
  roomId: string,
  teamId: string
): void {
  return new Promise((resolve) => {
    conn.emit(
      SocketGameEvents.JOIN_TEAM,
      userId,
      roomId,
      teamId,
      (response) => {
        resolve(response);
      }
    );
  });
}
