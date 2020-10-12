const SocketGameEvents = {
  // client -> server events
  CREATE_ROOM: 'create-room',
  JOIN_ROOM: 'join-room',

  // server -> client events
  ROOM_CREATED: 'room-created',
};

module.exports = {
  SocketGameEvents,
};
