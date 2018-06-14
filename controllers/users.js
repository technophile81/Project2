var express = require("express");

var router = express.Router();

// Import the model to use its database functions.
var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");

router.get("/viewuser/:user_id", isAuthenticated, function (req, res) {

    db.User.findOne({
        where: {
            userId: req.params.user_id
        },
        include: [
            {
                model: db.Follower,
                where: {
                    followerId: req.user.userId,
                    followedId: req.params.user_id
                },
                required: false
            }
        ]
    }).then(function (userdata) {
        db.Post.findAll({
            where: {
                userId: req.params.user_id
            },
            order: [
                ['createdAt', 'DESC']
            ],
            limit: 5,
        }).then(function (postdata) {
            userdata.getFolloweds().then(function (followeddata) {
                userdata.getSubscriptions().then(function (subbeddata) {
                    var hbsObject = {
                        myProfile: (req.params.user_id == req.user.userId),
                        profile: userdata,
                        posts: postdata,
                        followeds: followeddata,
                        subscriptions: subbeddata,
                    };
                    res.renderWithContext("viewuser", hbsObject);
                });
            });
        });
    })
});


router.get("/editprofile", isAuthenticated, function (req, res) {
    var hbsObject = {};
    res.renderWithContext("editprofile", hbsObject);
});

router.post("/editprofile", isAuthenticated, function (req, res) {
    var changes = {
        name: req.body.name,
        rank: req.body.rank,
        branch: req.body.branch,
        bio: req.body.bio,
        deployment: req.body.deployment
    };
 
    db.User.update(changes, {
        where: { userId: req.user.userId },
    }).then(function () {
        res.redirect("/viewuser/" + req.user.userId);
    });
});

module.exports = router;

    // Use the parameters passed in `req.body` to update the
    // current user's record in the database.

    // look at all the appropriate fields in req.body and construct a set: object to pass to db.User.update, and the where object will just be { userId: req.user.userId }


        // Everything necessary to render this template is available
    // in `user.User` in the context given by `renderWithContext()`.
    // 
    // That said, if it is desired to have services or ranks rendered
    // in the form with `#each`, the lists for those should be added
    // to `hbsObject`.