// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function (app) {

  app.get("/", function (req, res) {
    res.redirect("/index");
  });

  app.get("/index", function (req, res) {
    res.render("index");
  })

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads index.html
  //app.get("/", function(req, res) {
  //  res.sendFile(path.join(__dirname, "../public/index.html"));
  //});

  // ptsd route loads ptsd.html
  app.get("/ptsd", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/ptsdapp/ptsd.html"));
  });

  // getHelp route loads getHelp.html
  app.get("/getHelp", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/ptsdapp/getHelp.html"));
  });

  // aboutUs route loads aboutUs.html
  app.get("/aboutUs", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/ptsdapp/aboutUs.html"));
  });

};
