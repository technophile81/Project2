// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {
// Returns all categories
    app.get("/api/category", function (req, res) {

        db.Category.findAll({}).then(function (dbCategory) {
            res.json(dbCategory)
        }).catch(function (err) {
            res.json(err);
        })
    });
// Returns threads in a given category
    app.get("/api/category/:id", function (req, res) {

        db.Category.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Thread],
            order: [
                ['createdAt', 'DESC']
            ],
        }).then(function (dbCategory) {
            res.json(dbCategory)
        }).catch(function (err) {
            res.json(err);
        });
    })
}