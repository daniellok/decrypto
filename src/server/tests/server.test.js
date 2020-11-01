const { Room, Player } = require('../room');
const { handleJoin, handleCreate } = require('../EventHandlers');

const rooms = { asdf: new Room('asdf') };

test('cannot join room if it does not exist', () => {
  handleJoin(rooms, 'bebo', 'abcd', (response) => {
    expect(response).toEqual({ error: 'Room does not exist' });
  });
});

test('add player to room if room exists', () => {
  expect(rooms['asdf'].playerList).toEqual({});
  handleJoin(rooms, 'bebo', 'asdf', () => {
    expect(rooms['asdf'].playerList).toEqual({ bebo: new Player('bebo') });
  });
});
