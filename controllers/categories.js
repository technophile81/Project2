var express = require("express");
var sequelize = require("sequelize");

var router = express.Router();

// Import the model to use its database functions.
var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");

router.get("/viewcategory/:id", isAuthenticated, function (req, res) {

    db.Category.findOne({
        where: {
            categoryId: req.params.id
        }
    }).then(function (category) {
        db.Thread.findAll({
            attributes: {
                include: [
                    [ sequelize.fn('COUNT', sequelize.col('Posts.postId')), 'postCount' ],
                ],
            },
            where: {
                categoryId: req.params.id
            },
            group: "Thread.threadId",
            include: [
                { model: db.User },
                { model: db.Category },
                { model: db.Post },
                {
                    model: db.Subscription,
                    where: { userId: req.user.userId },
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
