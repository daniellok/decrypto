const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('dist'))

// global state to store all rooms
rooms = {};

app.get('/', (req, res) => {
  res.sendFile(path.join('/index.html'))
});

app.get('/:roomId', (req, res) => {
  // future route for rooms
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});


