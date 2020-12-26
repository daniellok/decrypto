function getTeamForUser(userId, roomState) {
  return userId in roomState.teamA.teamPlayerList
    ? roomState.teamA
    : roomState.teamB;
}

module.exports = {
  getTeamForUser,
};
