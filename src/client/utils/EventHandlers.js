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
): Promise<Room> {
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

export function startGame(conn: Socket, roomId: string): Promise<Room> {
  return new Promise((resolve) => {
    conn.emit(SocketGameEvents.START_GAME, roomId, (response) => {
      resolve(response);
    });
  });
}

export function finishEncoding(
  conn: Socket,
  roomId: string,
  teamId: string,
  clues: Array<string>
): Promise<Room> {
  return new Promise((resolve) => {
    conn.emit(
      SocketGameEvents.FINISH_ENCODING,
      roomId,
      teamId,
      clues,
      (response) => {
        resolve(response);
      }
    );
  });
}

export function updateGuess(
  conn: Socket,
  roomId: string,
  userId: string,
  guess: Array<number>
): Promise<string> {
  return new Promise((resolve) => {
    conn.emit(
      SocketGameEvents.UPDATE_GUESS,
      roomId,
      userId,
      guess,
      (response) => {
        resolve(response);
      }
    );
  });
}

export function leaveRoom(conn: Socket): void {
  conn.emit(SocketGameEvents.CLIENT_DISCONNECT);
}
