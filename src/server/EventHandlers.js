/**
 * This file contains all the socket.io event handlers
 */

const { Room } = require('./room');
const { generateId, stringifyRoom } = require('./utils');

function handleCreate(
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
  room.addPlayerToRoom(userId);
  clientCallback(room);
}

function handleJoinRoom(
  rooms, // global state rooms
  userId, // id of user making the call
  roomId, // id of room to join
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

  // addPlayerToRoom returns `true` if user is
  // either inactive or not already in the room
  if (room.addPlayerToRoom(userId)) {
    clientCallback({
      roomState: room,
    });
    return;
  }

  clientCallback({
    error: 'User already in room',
  });
}


function handleJoinTeam(
    rooms,
    roomId,
    userId,
    teamId,
    clientCallback
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
      error:'userId does not exist in room'
    })
  }

  if (room.addPlayerToTeam(userId, teamId)) {
    clientCallback({
      roomState: room,
    });
    return;
  }

  // something went wrong in addplayer
  clientCallback({
    error: 'addPlayerToTeam failed'
  })

}

module.exports = {
  handleCreate,
  handleJoinRoom,
  handleJoinTeam,
};
