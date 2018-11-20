// A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
// A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
var friendsInfo = require("../data/friends");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friendsInfo);
  });
  app.post("/api/friends", function(req, res) {
    var counterScore = 50;
    var newFriendScore = req.body.scores;
    var closestFriend;

    for (var i = 0; i < friendsInfo.length; i++) {
      var currentFriendScore = friendsInfo[i].scores;
      var totalScore = 0;

      for (var j = 0; j < currentFriendScore.length; j++) {
        totalScore += Math.abs(currentFriendScore[j] - newFriendScore[j]);
      }

      if (totalScore <= counterScore) {
        counterScore = totalScore;
        closestFriend = friendsInfo[i];
      }
    }
    friendsInfo.push(req.body);
    res.json(closestFriend);
  });
};

