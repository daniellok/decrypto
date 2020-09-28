const express = require('express');
const path = require('path');

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
  socket.on('create room', (userId) => handleCreate(userId));
});

app.get('/:roomId', (req, res) => {
  // future route for rooms
});

// setup our http listener
http.listen(port, () => {
  console.log(`listening on ${port}`);
});

// socket.io event handlers
function handleCreate(userId) {
  // fill in later
  console.log('creating room for ' + userId);
}
