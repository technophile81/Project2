// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {

    app.get("/api/category", function (req, res) {

        db.Category.findAll({}).then(function (dbCategory) {
            res.json(dbCategory)
        }).catch(function (err) {
            res.json(err);
        })
    });

    app.get("/api/category/:id", function (req, res) {

        db.Category.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Thread],
            order: [
                ['createdAt', 'DESC']
            ],
        });
    })





}