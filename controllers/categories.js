var express = require("express");
var sequelize = require("sequelize");
var moment = require("moment");

var router = express.Router();

// Import the model to use its database functions.
var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");
function getCategoryAndThreads(catId, userId, threadLimit) {
    return function (resolve, reject) {
        db.Category.findOne({
            where: {
                categoryId: catId
            }
        }).then(function (catdata) {
            db.Thread.findAll({
                attributes: {
                    include: [
                        [sequelize.fn('COUNT', sequelize.col('Posts.postId')), 'postCount'],
                    ],
                },
                where: {
                    categoryId: catId
                },
                group: "Thread.threadId",
                include: [
                    { model: db.User },
                    { model: db.Category },
                    {
                      model: db.Post,
                      attributes: [],
                    },
                    {
                        model: db.Subscription,
                        where: { userId: userId },
                        required: false // this is an outer join; will null if this doesn't exist but will still return the row; 
                    },
                ],
                order: [
                    ['createdAt', 'DESC'],
                ],
            }).then(function (allthreaddata) {
                let threaddata = [];

                // Since we decrement below, -1 will never reach 0
                // making this the equivalent of infinite.
                //
                // Unfortunately we can't use `limit` above with
                // how complex the SQL join is.
                if (!threadLimit) {
                    threadLimit = -1;
                }

                for (let thread of allthreaddata) {
                    thread.threadTime = moment(thread.createdAt).format('MMMM Do YYYY, HH:mm');
                    threaddata.push(thread);

                    // stop processing if we hit our thread limit
                    if (--threadLimit === 0) {
                        break;
                    }
                };

                resolve({
                    category: catdata,
                    threads: threaddata,
                });
            });
        });
    }
}

router.get("/viewcategory/:id", isAuthenticated, function (req, res) {
    var promise = new Promise(getCategoryAndThreads(req.params.id, req.user.userId));

    Promise.resolve(promise).then(function (hbsObject) {
        res.renderWithContext("threadlist", hbsObject);
    })
});

router.get("/forum", isAuthenticated, function (req, res) {
    db.Category.findAll({}).then(function (catlist) {
        let catpromises = [];

        for (let cat of catlist) {
            catpromises.push(new Promise(getCategoryAndThreads(cat.categoryId, req.user.userId, 3)));
        };

        Promise.all(catpromises).then(function (values) {
            var hbsObject = {
                'categoriesWithThreads': values
            };

            res.renderWithContext("categorylist", hbsObject);
        });
    });
});

module.exports = router;
