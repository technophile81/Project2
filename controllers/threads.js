var express = require("express");

var router = express.Router();

// Import the model to use its database functions.
var Thread = require("../models/thread.js");

router.get("/api/thread/:id", function (req, res) {

    db.Thread.findAll({
        threadTitle: req.body.threadTitle,
        
        where: {
            id: req.params.id
        },
        include: [db.Post],
        order: [
            ['createdAt', 'ASC']
        ],
    }).then(function (dbThread) {
        res.json(dbThread)
    }).catch(function (err) {
        res.json(err);
    });
});
console.log(Thread);

module.exports = router;
