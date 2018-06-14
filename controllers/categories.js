var express = require("express");
var sequelize = require("sequelize");
var moment = require("moment");

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
                    [sequelize.fn('COUNT', sequelize.col('Posts.postId')), 'postCount'],
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
                ['createdAt', 'DESC'],
            ],
        }).then(function (data) {
            for (let thread of data) {
                thread.threadTime = moment(thread.createdAt).format('MMMM Do YYYY, HH:mm');
            };
            var hbsObject = {
                threads: data,
                category: category
            };
            res.renderWithContext("threadlist", hbsObject);
        });
    })
});

function getCategoryAndThreads(catId) {
    return function (resolve, reject) {
        db.Category.findOne({
            where: { categoryId: catId }
        })
            .then(function (catdata) {
                db.Thread.findAll({
                    where: { 
                        categoryId: catId 
                    },
                    order: [
                        ['createdAt', 'DESC']
                    ],
                    limit: 5
                }).then(function (threaddata) {
                    resolve({
                        category: catdata,
                        threads: threaddata,
                    });
                    console.log(catdata);
                    console.log(threaddata);
                })
            });
    };
    console.log(catId);
};

router.get("/forum", isAuthenticated, function (req, res) {
    db.Category.findAll({}, function (catlist) {
        console.log(catlist);
        let catpromises = [];
        console.log(catpromises);

        for (let cat in catlist) {
            catpromises.push(new Promise(getCategoryAndThreads(cat.categoryId)));
            console.log(cat);
        };
        console.log(catlist);

        Promise.all(catpromises, function (values) {
            var hbsObject = {
                'categoriesWithThreads': values
            };

            res.renderWithContext("categorylist", hbsObject);
        });
    }
    )
});

module.exports = router;
