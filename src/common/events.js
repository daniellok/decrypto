const SocketGameEvents = {
  // client -> server events
  CREATE_ROOM: 'create-room',
  JOIN_ROOM: 'join-room',
  LEAVE_ROOM: 'leave-room',
  JOIN_TEAM: 'join-team',
  START_GAME: 'start-game',
  FINISH_ENCODING: 'finish-encoding',
  UPDATE_GUESS: 'update-guess',

  // server -> client events
  ROOM_CREATED: 'room-created',
  STATE_UPDATE: 'state-update',
};

module.exports = {
  SocketGameEvents,
};
