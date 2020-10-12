const express = require('express');
const path = require('path');
const { SocketGameEvents } = require('../common/events');
const { Room } = require('./room');
const { generateId } = require('./utils');

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
  console.log('a user connected');
  socket.on(SocketGameEvents.CREATE_ROOM, (userId) => handleCreate(userId));
  socket.on(SocketGameEvents.JOIN_ROOM, (userId, roomId) => handleJoin(userId, roomId))
});

app.get('/:roomId', (req, res) => {
  // future route for rooms
});

// setup our http listener
http.listen(port, () => {
  console.log(`listening on ${port}`);
});

// socket.io event handlers
function handleCreate(userId/*: string */) {
  console.log(`create room received from: ${userId} `)
  roomId = generateId();
  while (rooms[roomId] != null) {
    console.log('id taken, generating new id');
    roomId = generateId();
  }
  room = new Room(roomId);
  rooms[roomId] = room;
  console.log('new room created:', rooms);
  console.log('adding player to room')
  room.addPlayerToRoom(userId)
}

function handleJoin(userId/*: string */, roomId/*: string */) {
  if (rooms[roomId] == null) {
    // TODO: send nonexist message to client to display
   console.log(`room id ${roomId} does not exist`)
  } else {
    room = rooms[roomId]
    // TODO: implement proper player class here, right now we are just using strings
    /*fail only if playerList.includes(userId) and user is active. if user is not active,
    we should flip the active boolean to true and return success.*/
    if (room.addPlayerToRoom(userId)) { // TODO: if player exists AND is active
      console.log(`APP: ${userId} added to room ${roomId}`)
    }
    console.log(`APP: ${userId} already exists in ${roomId}`)
  }
  console.log('current rooms: ', rooms)
}


