var express = require("express");

var router = express.Router();

// Import the model to use its database functions.
var db = require("../models");

router.get("/viewthread/:id", function (req, res) {

    db.Thread.findOne({
        where: {
            threadId: req.params.id
        },
        include: [
            { model: db.Category }
        ]
    }).then(function (thread) {
        db.Post.findAll({
            where: {
                threadId: req.params.id
            },
            include: [
                { model: db.User },
            ],
            order: [ 'createdAt' ]
        }).then(function (data) {
            var hbsObject = {
                thread: thread,
                posts: data
            };
            res.render("postlist", hbsObject);
        });
    })
})

module.exports = router;
