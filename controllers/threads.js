var express = require("express");
var bbCode = require("ya-bbcode");
var moment = require("moment");


var router = express.Router();

// Import the model to use its database functions.
var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");

router.get("/viewthread/:id", isAuthenticated, function (req, res) {
    db.Thread.findOne({
        where: {
            threadId: req.params.id
        },
        include: [
            { model: db.Category },
            {
                model: db.Subscription,
                where: { userId: req.user.userId },
                required: false // this is an outer join; will null if this doesn't exist but will still return the row; 
            },
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
            let parser = new bbCode();

            for (let post of data) {
                post.myPost = (post.userId == req.user.userId);
                post.postContent = post.postContent.replace(/&/g, "&amp;");
                post.postContent = post.postContent.replace(/</g, "&lt;");
                post.postContent = post.postContent.replace(/>/g, "&gt;");
                // Add an empty tag to force bbcode rendering even if
                // there is no bbcode in the actual post.
                post.postContent = parser.parse(post.postContent + '[b][/b]');
                post.postTime = moment(post.createdAt).format('MMMM Do YYYY, HH:mm');
            }

            var hbsObject = {
                thread: thread,
                posts: data
            };
            res.renderWithContext("postlist", hbsObject);
        });
    })
});

module.exports = router;
