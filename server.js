// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var session = require("express-session");

// Requiring passport as we've configured it
var passport = require("./config/passport");


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// Static directory
app.use(express.static("public"));

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Handlebars config 
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");

// Called _before_ every route is actually processed
// Adds a new method to responses called `renderWithCategories()` that will
// then add `categories` to the Handlebars context.
app.use(function (req, res, next) {
  res.renderWithContext = function(template, context) {
    if (req.user) {
      db.Category.findAll({}).then(function (data) {
        context.user = req.user.User;
        context.categories = data;
        res.render(template, context);
      });
    } else {
      res.render(template, context);
    }
  }
  next();
});

// Routes
// =============================================================
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
require("./routes/passport-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function () {
  // REMOVE LATER
  db.User.create({
    name: "Dwayne 'the Rock' Johnson",
    rank: 'E-6',
    branch: 'army',
    deployment: 'Egypt',
    mos: 'Awesome',
    bio: 'Kicked names, took ass.'
  }).then(function (testuser) {
    db.Credential.create({
      userId: testuser.userId,
      credentialSource: 'local',
      credentialName: 'test@example.com',
      credentialSecret: '1234',
    });
    db.Category.create(
      {
        categoryName: "General"
      }).then(function (testcat) {
        db.Category.bulkCreate([{
          categoryName: "Stuff"
        }, {
          categoryName: "Random"
        }, {
          categoryName: "Family"
        },
        {
          categoryName: "Lorem Ipsum"
        },
        {
          categoryName: "Dolor Sit"
        }]);

        db.Thread.bulkCreate([{
          threadTitle: "This is a thread title",
          userId: testuser.userId,
          categoryId: testcat.categoryId,
        },
        {
          threadTitle: "This is another thread title",
          userId: testuser.userId,
          categoryId: testcat.categoryId,
        }]).then(function () {
          db.Thread.findOne({}).then(function (testthread) {
            db.Post.bulkCreate([{
              postTitle: "This is a test title",
              postContent: "Lorem ipsum dolor sit amet lkja lkjf",
              userId: testuser.userId,
              threadId: testthread.threadId
            },
            {
              postTitle: "This is a reply title",
              postContent: "Lorem ipsum dolor sit amet lkja lkjf reply crap blah blah blah",
              userId: testuser.userId,
              threadId: testthread.threadId
            }]);

            db.Subscription.create({
              userId: testuser.userId,
              threadId: testthread.threadId
            });

            db.User.create({
              name: "Jack Black",
              rank: 'E-1',
              branch: 'army',
              deployment: 'Jumanji',
              mos: 'Feminine',
              bio: 'OMG.'
            }).then(function (testfollowed) {
              db.Follower.create({
                followerId: testuser.userId,
                followedId: testfollowed.userId
              });
            });
          })
        })
      })
  })
});

// REMOVE LATER
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});

