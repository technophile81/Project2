// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

module.exports = function(app) {

  // GET route for getting all of the posts
  app.get("/api/post", function(req, res) {
    db.Post.findAll({})
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  app.get("/api/post/:id", function(req, res) {
    db.Post.findOne({
      where: {
        postId: req.params.id
      }
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });



  // POST route for saving a new post
  app.post("/api/post", function(req, res) {
    console.log(req.body);
    db.Post.create({
      postTitle: req.body.postTitle,
      postContent: req.body.postContent,
      categoryName: req.body.categoryName
    })
      .then(function(dbPost) {
        res.json(dbPost);
      }).catch(function (err) {
        res.json(err);
    });
  });

    // DELETE route for deleting posts
    app.delete("/api/post/:id", function(req, res) {
      db.Post.destroy({
        where: {
          postId: req.params.id
        }
      })
        .then(function(dbPost) {
          res.json(dbPost);
        }).catch(function (err) {
          res.json(err);
      });
    });

      // PUT route for updating posts
  app.put("/api/post/:id", function(req, res) {
    db.Post.update(req.body,
      {
        where: {
          postId: req.params.id
        }
      })
      .then(function(dbPost) {
        res.json(dbPost);
      }).catch(function (err) {
        res.json(err);
    });
  });

}