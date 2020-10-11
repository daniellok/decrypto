const SocketGameEvents = {
  // client -> server events
  CREATE_ROOM: 'create-room',

  // server -> client events
  ROOM_CREATED: 'room-created',

  JOIN_ROOM: 'join-room',
};

module.exports = {
  SocketGameEvents,
};
