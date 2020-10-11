const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function generateId() {
  return [...Array(5)]
    .map((_) => chars[Math.floor(Math.random() * chars.length)])
    .join('');
}

module.exports = {
  generateId,
};
