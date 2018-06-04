// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads index.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  // ptsd route loads ptsd.html
  app.get("/ptsd", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/ptsd.html"));
  });

  // getHelp route loads getHelp.html
  app.get("/getHelp", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/getHelp.html"));
  });

  // aboutUs route loads aboutUs.html
  app.get("/aboutUs", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/aboutUs.html"));
  });

};
