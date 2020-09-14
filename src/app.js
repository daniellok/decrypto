const express = require('express');
const app = express();
const port = 3000;

// global state to store all rooms
rooms = {};

app.get('/', (req, res) => {
  // future landing page
  // users will come here to create a room
});

app.get('/:roomId', (req, res) => {
  // future route for rooms
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});


