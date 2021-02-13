function getTeamForUser(userId, roomState) {
  return userId in roomState.teamA.teamPlayerList
    ? roomState.teamA
    : roomState.teamB;
}

function getOtherTeamForUser(userId, roomState) {
  return userId in roomState.teamA.teamPlayerList
    ? roomState.teamB
    : roomState.teamA;
}

module.exports = {
  getOtherTeamForUser,
  getTeamForUser,
};
