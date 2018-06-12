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
            },
            { model: db.Post }

        ]
    }).then(function (userdata) {
        var hbsObject = {
            profile: userdata,
            posts: userdata
        };
        res.renderWithContext("viewuser", hbsObject);
    })
});

module.exports = router;