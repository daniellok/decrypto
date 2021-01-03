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

// player should see minimal state for the opposing team
function redactOpposingTeam(team) {
  return {
    ...team,
    words: undefined,
    code: undefined,
    wordGuesses: undefined,
  };
}

// if the player isn't codemaster, they shouldn't see the code
function redactOwnTeam(team) {
  return {
    ...team,
    code: undefined,
  };
}

function redactRoomStateForPlayer(playerId, room) {
  const playerInTeamA = Object.keys(room.teamA.teamPlayerList).includes(
    playerId
  );

  let redactedTeamA;
  let redactedTeamB;
  if (playerInTeamA) {
    redactedTeamB = redactOpposingTeam(room.teamB);
    redactedTeamA =
      room.teamA.codemaster === playerId
        ? room.teamA
        : redactOwnTeam(room.teamA);
  } else {
    redactedTeamA = redactOpposingTeam(room.teamA);
    redactedTeamB =
      room.teamB.codemaster === playerId
        ? room.teamB
        : redactOwnTeam(room.teamB);
  }

  return {
    ...room,
    teamA: redactedTeamA,
    teamB: redactedTeamB,
  };
}

function sendRedactedStateUpdates(io, room) {
  Object.values(room.playerList).map((player) => {
    const redactedRoomState = redactRoomStateForPlayer(player.id, room);
    io.to(player.socketId).emit(SocketGameEvents.STATE_UPDATE, {
      roomState: redactedRoomState,
    });
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
