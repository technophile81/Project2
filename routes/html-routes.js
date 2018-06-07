// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  app.get("/", function (req, res) {
    res.redirect("/index");
    });

    app.get("/index", function (req, res) {
      res.render("index");
  })

  app.get("/postform", function (req, res) {
    res.render("postform");
  })

  app.get("/viewcategory", function (req, res) {
    res.render("threadlist");
  })
  

  // Each of the below routes just handles the HTML page that the user gets sent to.

 // var homeController = require("../controllers/home");

//module.exports = function(app) {
//  app.get("/", homeController.renderHome);
//};

  // index route loads index.html
  //app.get("/", function(req, res) {
  //  res.sendFile(path.join(__dirname, "../public/index.html"));
  //});

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

  app.get("/postform", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/postform.html"));
  });

  app.get("/postdisplay", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/postdisplay.html"));
  });
  app.get("/samplecategorylist", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/samplecategorylist.html"));
  });




};
