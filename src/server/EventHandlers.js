/**
 * This file contains all the socket.io event handlers
 */

const { Room } = require('./room');
const { generateId, stringifyRoom } = require('./utils');

function handleCreate(
  rooms, // global state rooms
  userId, // id of user creating room
  respond // socket.io fn to deliver response to client
) {
  console.log(`create room received from: ${userId} `);
  roomId = generateId();
  while (rooms[roomId] != null) {
    console.log('id taken, generating new id');
    roomId = generateId();
  }
  room = new Room(roomId);
  rooms[roomId] = room;
  console.log('new room created:', rooms);
  room.addPlayerToRoom(userId);
  respond(room);
}

function handleJoin(
  rooms, // global state rooms
  userId, // id of user making the call
  roomId, // id of room to join
  respond // socket.io fn to deliver response to client
) {
  // invalid room id provided
  if (rooms[roomId] == null) {
    respond({
      error: 'Room does not exist',
    });
    return;
  }

  room = rooms[roomId];

  // addPlayerToRoom returns `true` if user is
  // either inactive or not already in the room
  if (room.addPlayerToRoom(userId)) {
    respond({
      roomState: room,
    });
    return;
  }

  respond({
    error: 'User already in room',
  });
}

module.exports = {
  handleCreate,
  handleJoin,
};
