const SocketGameEvents = {
  // client -> server events
  CREATE_ROOM: 'create-room',
  JOIN_ROOM: 'join-room',
  LEAVE_ROOM: 'leave-room',

  // server -> client events
  ROOM_CREATED: 'room-created',
};

module.exports = {
  SocketGameEvents,
};
