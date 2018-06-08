// /api/subscribed User.getSubscriptions

var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {
    // Returns threads that a user has been subscribed to
    app.get("/api/subscribed", function (req, res) {

        db.Subscription.findAll({
            where: {
                id: req.params.id
            },
            include: [db.Thread],
            order: ['createdAt', 'ASC']
        })
    })
}