// A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
// A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.

var path = require("path");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
  });
  // Basic route that sends the user first to the AJAX Page
  app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "survey.html"));
  });
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });
  app.post("/api/friends", function(req, res) {
    
    var counterScore = 50;
    var newFriendScore = req.body.scores;
    var closestFriend;


    for (var i = 0; i < path.length; i++) {

        var currentFriendScore = path[i].scores;
        var totalScore = 0;


        for (var j = 0; j < currentFriendScore.length; j++) {
            totalScore += Math.abs(currentFriendScore[j] - newFriendScore[j]);
        }

        if (totalScore <= counterScore) {
            counterScore = totalScore;
            closestFriend = path[i];
        }
    }
    path.push(req.body);
    res.json(friends);
  });
};
var bestmatches;
