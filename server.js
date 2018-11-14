//express is a framework that makes routing easier
var express = require("express");
//exress function a var app
var app = express();

var path = require("path");

// Define a port to listen for incoming requests, if there is a port use it if not then use 3000
var PORT = process.env.PORT || 3000;

//to get the response from the server as it send in zeroes and ones it need to be parsed
app.use(express.urlencoded({ extended: true }));
//also have the ability to read and write the json
app.use(express.json());

//
require("./app/routing/apiRoutes.js");
require("./app/routing/htmlRoutes.js");

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

// Basic route that sends the user first to the AJAX Page
app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "survey.html"));
});

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
