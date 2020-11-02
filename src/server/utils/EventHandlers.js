/**
 * This file contains all the socket.io event handlers
 */

const { SocketGameEvents } = require('../../common/events');
const { Room } = require('../room');
const { generateId, stringifyRoom } = require('./utils');

function handleCreate(
  conn, // client's socket connection
  rooms, // global state rooms
  userId, // id of user creating room
  clientCallback // socket.io fn to deliver response to client
) {
  console.log(`create room received from: ${userId} `);
  let roomId = generateId();
  while (rooms[roomId] != null) {
    console.log('id taken, generating new id');
    roomId = generateId();
  }
  const room = new Room(roomId);
  rooms[roomId] = room;
  console.log('new room created:', rooms);

  // subscript player to room events
  conn.join(roomId);
  room.addPlayerToRoom(userId);
  clientCallback({ roomState: room });
}

function handleJoinRoom(
  conn, // client's socket connection
  rooms, // global state rooms
  userId, // id of user making the call
  roomId, // id of room to join
  clientCallback // socket.io fn to deliver response to client
) {
  console.log(`join room received from: ${userId} for room: ${roomId}`);
  // invalid room id provided
  if (rooms[roomId] == null) {
    console.log(`join room failed: room [${roomId}] does not exist`);
    clientCallback({
      error: `The room code [${roomId}] does not exist.`,
    });
    return;
  }

  const room = rooms[roomId];

  // addPlayerToRoom returns `true` if user is
  // either inactive or not already in the room
  if (!room.addPlayerToRoom(userId)) {
    clientCallback({
      error: `The username ${userId} is already in this room!`,
    });
    return;
  }

  // subscribe user to room events
  // emit to the room that the user has joined
  conn.join(roomId);
  console.log('emitting to room', conn);
  conn.to(roomId).emit(SocketGameEvents.STATE_UPDATE, { roomState: room });

  // return roomState in success case
  clientCallback({
    roomState: room,
  });
}

function handleJoinTeam(
  conn, // client's socket connection
  rooms, // global state rooms
  roomId, // id of room
  userId, // id of user making the call
  teamId, // id of team the user is trying to join
  clientCallback // socket.io fn to deliver response to client
) {
  // invalid room id provided
  if (rooms[roomId] == null) {
    clientCallback({
      error: 'Room does not exist',
    });
    return;
  }

  const room = rooms[roomId];

  // userId not in room
  // TODO: user activity?
  if (room.playerList[userId] == null) {
    clientCallback({
      error: 'userId does not exist in room',
    });
  }

  if (!room.addPlayerToTeam(userId, teamId)) {
    // something went wrong in addplayer
    clientCallback({
      error: 'addPlayerToTeam failed',
    });
    return;
  }

  // success, emit an event to all users
  conn.to(roomId).emit(SocketGameEvents.STATE_UPDATE, { roomState: room });
  clientCallback({
    roomState: room,
  });
}

module.exports = {
  handleCreate,
  handleJoinRoom,
  handleJoinTeam,
};
