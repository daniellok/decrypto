const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function generateId() {
  return [...Array(4)]
    .map((_) => chars[Math.floor(Math.random() * chars.length)])
    .join('');
}

function stringifyRoom(room, userId) {
  // TODO: before stringifying, remove state that
  // shouldn't be seen by the user (e.g. clues from
  // the other team)
  return JSON.stringify(room);
}

module.exports = {
  generateId,
  stringifyRoom,
};
