var express = require("express");

var router = express.Router();

// Import the model to use its database functions.
var db = require("../models");

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
                { model: db.Category },
                {
                    model: db.Subscription,
                    where: { userId: 1 }, // change later
                    required: false // this is an outer join; will null if this doesn't exist but will still return the row; 
                },
            ],
            order: [
                [ 'createdAt', 'DESC' ],
            ],
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
