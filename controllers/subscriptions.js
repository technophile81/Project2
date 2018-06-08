var express = require("express");

var router = express.Router();

// Import the model to use its database functions.
var db = require("../models");

// api PUT for toggle ajax request, then list subscriptions

router.put("/api/subscription/:thread_id", function (req, res) {
    if (req.body.subscribed) {
        db.Subscription.upsert({
            userId: 1,
            threadId: req.params.thread_id
        }).then(function () {
            res.json({ subscribed: true });
        });
    } else {
        db.Subscription.destroy({
            where: {
                userId: 1,
                threadId: req.params.thread_id
            }
        }).then(function () {
            res.json({ subscribed: false });
        });
    }
});

module.exports = router;