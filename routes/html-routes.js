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
    res.redirect("/login");
  });

  app.get("/login", function (req, res) {
    res.render("login");
  });

  app.get("/signup", function (req, res) {
    res.render("signup");
  });

  app.get("/profile", function (req, res) {
    res.renderWithContext("profile", {});
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

  // app.get("/assessment", function (req, res) {
  //   res.sendFile(path.join(__dirname, "../public/ptsdapp/index.html"));
  // });

  // app.get("/assesmentStuff", function(req.res) {
    // send back assesment.handlebars file to client
  // });



  // var isAuthenticated = require("../config/middleware/isAuthenticated");

  
  // app.get("/profile", isAuthenticated, function (req, res) {
  //   if (isAuthenticated) {
  //     res.sendFile(path.join(__dirname, "../public/profile.html"))
  //   }
  //   else {
  //     res.redirect("/signup");
  //   }
  // });




};
