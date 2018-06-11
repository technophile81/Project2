var express = require("express");

var router = express.Router();

// Import the model to use its database functions.
var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");

// api PUT for toggle ajax request, then list subscriptions

router.put("/api/subscription/:thread_id", isAuthenticated, function (req, res) {
    if (req.body.subscribed) {
        db.Subscription.upsert({
            userId: req.user.userId,
            threadId: req.params.thread_id
        }).then(function () {
            res.json({ subscribed: true });
        });
    } else {
        db.Subscription.destroy({
            where: {
                userId: req.user.userId,
                threadId: req.params.thread_id
            }
        }).then(function () {
            res.json({ subscribed: false });
        });
    }
});

module.exports = router;