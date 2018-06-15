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
var addPostToIndex = require("./config/search");

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

// Handlebars config -- here's where we also define default layout, instead of where it was before
var hbs = exphbs.create({
  helpers: {
    isUser: function (variable1, variable2) {
      if (variable1 == variable2) {
          console.log("user owns event");
          return true;
      } else {
          console.log("user does not own event");
          return false;
      }
  },
  isAttending: function(userAttend, eventId){
    let attending;
    console.log("______________________________")
    console.log("in isattending: " + userAttend + "/" + eventId)
    console.log("______________________________")

    if (userAttend === eventId){
      console.log("we have registered attending");
      attending= true;
      return attending;
    }else{
      console.log("we have registered NOT attending");

      attending = false;
      return attending;
    };
  }
  },
  defaultLayout: 'main'
});

// Handlebars config 
app.engine("handlebars", hbs.engine);

app.set("view engine", "handlebars");

// Called _before_ every route is actually processed
// Adds a new method to responses called `renderWithCategories()` that will
// then add `categories` to the Handlebars context.
app.use(function (req, res, next) {
  res.renderWithContext = function(template, context) {
    if (req.user && req.user.User) {
      db.Category.findAll({}).then(function (catdata) {
        context.user = req.user.User;
        context.categories = catdata;
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
require("./routes/event-comment-routes.js")(app);
require("./routes/event-routes.js")(app);
require("./routes/event-attending-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: (db.process_env !== "production") }).then(function () {
  db.User.findOne({
    where: {
      userId: 1,
    },
  }).then(function (finduser) {
    if (!finduser) {
      db.User.create({
        name: "Dwayne 'the Rock' Johnson",
        avatar: "https://r.hswstatic.com/w_907/gif/tesla-cat.jpg",
        coverImg: "https://r.hswstatic.com/w_907/gif/tesla-cat.jpg",
        rank: 'E-6',
        branch: 'army',
        deployment: 'Iraq',
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
            db.Category.bulkCreate([
              { categoryName: "Relationships" },
              { categoryName: "Stress Management" },
              { categoryName: "Family" },
              { categoryName: "Random" }
            ]);

            db.Thread.bulkCreate([{
              threadTitle: "My wife is mad at me",
              userId: testuser.userId,
              categoryId: testcat.categoryId,
            },
              {
                threadTitle: "I don't want to go to school today",
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
                    }]).then(function () {
                      addPostToIndex(1);
                      addPostToIndex(2);
                    });

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
                });
              });
          });
      });
    }
  });
});

// REMOVE LATER
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});

