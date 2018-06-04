// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

app.get("/api/thread/:id", function (req, res) {

    db.Thread.findAll({
        threadTitle: req.body.threadTitle,
        
        where: {
            id: req.params.id
        },
        include: [db.Post],
        order: [
            ['createdAt', 'ASC']
        ],
    });
})

}