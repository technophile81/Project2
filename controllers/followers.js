var express = require("express");

var router = express.Router();

// Import the model to use its database functions.
var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");

// api/follow

router.put("/api/follow/:user_id", isAuthenticated, function (req, res) {
    // prevents user from following self
    if (req.body.following && req.params.user_id != req.user.userId) {
        db.Follower.upsert({
            followerId: req.user.userId,
            followedId: req.params.user_id
        }).then(function () {
            res.json({ following: true });
        })
    } else {
        db.Follower.destroy({
            where: {
                followerId: req.user.userId,
                followedId: req.params.user_id
            }
        }).then(function () {
            res.json({ following: false });
        })
    }
});

module.exports = router;
