const { SocketGameEvents } = require('../../common/events');
const words = require('../words');

const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function generateCode() {
  const code = [];
  while (code.length < 3) {
    let num = Math.floor(Math.random() * 4) + 1;
    if (!code.includes(num)) {
      code.push(num);
    }
  }
  return code;
}

function generateId() {
  return [...Array(4)]
    .map((_) => chars[Math.floor(Math.random() * chars.length)])
    .join('');
}

function generateWords() {
  const indices = [];
  while (indices.length < 8) {
    let num = Math.floor(Math.random() * words.length);
    if (!indices.includes(num)) {
      indices.push(num);
    }
  }
  return indices.map((idx) => words[idx]);
}

function redactTeam(team) {
  return {
    ...team,
    words: undefined,
    code: undefined,
    wordGuesses: undefined,
  };
}

function sendRedactedStateUpdates(io, room) {
  io.to(`${room.id}.A`).emit(SocketGameEvents.STATE_UPDATE, {
    roomState: {
      ...room,
      teamB: redactTeam(room.teamB),
    },
  });
  io.to(`${room.id}.B`).emit(SocketGameEvents.STATE_UPDATE, {
    roomState: {
      ...room,
      teamA: redactTeam(room.teamA),
    },
  });
}

function stringifyRoom(room, userId) {
  // TODO: before stringifying, remove state that
  // shouldn't be seen by the user (e.g. clues from
  // the other team)
  return JSON.stringify(room);
}

module.exports = {
  generateCode,
  generateId,
  generateWords,
  sendRedactedStateUpdates,
  stringifyRoom,
};
