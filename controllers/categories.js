var express = require("express");

var router = express.Router();

// Import the model to use its database functions.
var db = require("../models");

// Returns all categories
router.get("/api/category", function (req, res) {

    db.Category.findAll({}).then(function (dbCategory) {
        res.json(dbCategory)
    }).catch(function (err) {
        res.json(err);
    })
});

// Returns threads in a given category
router.get("/api/category/:id", function (req, res) {

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
});

router.get("/viewcategory/:id", function (req, res) {

    db.Category.findOne({
        where: {
            categoryId: req.params.id
        }
    }).then(function (category) {

        db.Thread.findAll({
            where: {
                categoryId: req.params.id
            },
            include: [
                { model: db.User },
                { model: db.Category }
            ]
            // order: [
            //     'createdAt', 'DESC'
            // ],
        }).then(function (data) {
            var hbsObject = {
                threads: data,
                category: category
            };
            res.render("threadlist", hbsObject);
        });
    })
})

module.exports = router;
