const express = require('express');
const path = require('path');
const { SocketGameEvents } = require('../common/events');
const { Room } = require('./room');
const { generateId } = require('./utils/utils');
const {
  handleCreate,
  handleJoinRoom,
  handleJoinTeam,
  handleStartGame,
  handleFinishEncoding,
  handleUpdateGuess,
  handleClientDisconnect,
} = require('./utils/EventHandlers');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = 3000;

app.use(express.static('dist'));

// global state to store all rooms
rooms = {};

app.get('/', (req, res) => {
  res.sendFile(path.join('/index.html'));
});

// setup our socket.io listener
io.on('connection', (socket) => {
  socket.on(SocketGameEvents.CREATE_ROOM, (userId, clientCallback) => {
    handleCreate(socket, rooms, userId, clientCallback);
  });
  socket.on(SocketGameEvents.JOIN_ROOM, (userId, roomId, clientCallback) => {
    handleJoinRoom(socket, rooms, userId, roomId, clientCallback);
  });
  socket.on(
    SocketGameEvents.JOIN_TEAM,
    (userId, roomId, teamId, clientCallback) => {
      handleJoinTeam(socket, rooms, roomId, userId, teamId, clientCallback);
    }
  );
  socket.on(SocketGameEvents.START_GAME, (roomId, clientCallback) => {
    handleStartGame(io, rooms, roomId, clientCallback);
  });
  socket.on(
    SocketGameEvents.FINISH_ENCODING,
    (roomId, teamId, clues, clientCallback) => {
      handleFinishEncoding(io, rooms, roomId, teamId, clues, clientCallback);
    }
  );
  socket.on(SocketGameEvents.UPDATE_GUESS, (roomId, playerId, guess) => {
    handleUpdateGuess(io, rooms, roomId, playerId, guess);
  });

  socket.on(SocketGameEvents.CLIENT_DISCONNECT, () => {
    handleClientDisconnect(socket);
  });
});

app.get('/:roomId', (req, res) => {
  // future route for rooms
});

// setup our http listener
http.listen(port, () => {
  console.log(`listening on ${port}`);
});
