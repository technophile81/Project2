var express = require("express");

var router = express.Router();

// Import the model to use its database functions.
var Post = require("../models/post.js");

router.get("/api/post", function (req, res) {
    db.Post.findAll({})
        .then(function (dbPost) {
            res.json(dbPost);
        });
});

router.get("/api/post/:id", function (req, res) {
    db.Post.findOne({
        where: {
            postId: req.params.id
        }
    })
        .then(function (dbPost) {
            res.json(dbPost);
        });
});

// POST route for saving a new post
router.post("/api/post", function (req, res) {
    console.log(req.body);
    db.Post.create({
        postTitle: req.body.postTitle,
        postContent: req.body.postContent,
        categoryName: req.body.categoryName
    })
        .then(function (dbPost) {
            res.json(dbPost);
        }).catch(function (err) {
            res.json(err);
        });
});

// DELETE route for deleting posts
router.delete("/api/post/:id", function (req, res) {
    db.Post.destroy({
        where: {
            postId: req.params.id
        }
    })
        .then(function (dbPost) {
            res.json(dbPost);
        }).catch(function (err) {
            res.json(err);
        });
});

// PUT route for updating posts
router.put("/api/post/:id", function (req, res) {
    db.Post.update(req.body,
        {
            where: {
                postId: req.params.id
            }
        })
        .then(function (dbPost) {
            res.json(dbPost);
        }).catch(function (err) {
            res.json(err);
        });
});

module.exports = router;
