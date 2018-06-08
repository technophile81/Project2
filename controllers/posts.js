var express = require("express");

var router = express.Router();

// Import the model to use its database functions.
var db = require("../models");

/* router.get("/api/post", function (req, res) {
    db.Post.findAll({})
        .then(function (dbPost) {
            res.json(dbPost);
        });
}); */

/* router.get("/api/post/:id", function (req, res) {
    db.Post.findOne({
        where: {
            postId: req.params.id
        }
    })
        .then(function (dbPost) {
            res.json(dbPost);
        });
}); */

// POST route for saving a new post
/* router.post("/api/post", function (req, res) {
    console.log(req.body);
    db.Post.create({
        postTitle: req.body.postTitle,
        postContent: req.body.postContent,
        categoryName: req.body.categoryName
    })
        .then(function (dbPost) {
            res.json(dbPost);
        }).catch(function (err) {
            res.json(err);
        });
}); */

// DELETE route for deleting posts
/* router.delete("/api/post/:id", function (req, res) {
    db.Post.destroy({
        where: {
            postId: req.params.id
        }
    })
        .then(function (dbPost) {
            res.json(dbPost);
        }).catch(function (err) {
            res.json(err);
        });
});
 */
// PUT route for updating posts
/* router.put("/api/post/:id", function (req, res) {
    db.Post.update(req.body,
        {
            where: {
                postId: req.params.id
            }
        })
        .then(function (dbPost) {
            res.json(dbPost);
        }).catch(function (err) {
            res.json(err);
        });
}); */

router.get("/postform", function (req, res) {
    var hbsObject = {};
    if (req.query.category_id) {
        // new thread
        hbsObject.post_type = "new thread";
        hbsObject.post_id = req.query.category_id;

        res.render("postform", hbsObject);
    } else if (req.query.thread_id) {
        // reply to thread
        hbsObject.post_type = "reply to thread";
        hbsObject.post_id = req.query.thread_id;

        res.render("postform", hbsObject);
    } else if (req.query.post_id) {
        // edit post
        hbsObject.post_type = "edit post";
        hbsObject.post_id = req.query.post_id;

        db.Post.findOne({
            where: {
                postId: req.query.post_id,
            }
        }).then(function (postdata) {
            hbsObject.post_title = postdata.postTitle;
            hbsObject.post_content = postdata.postContent;

            res.render("postform", hbsObject);
        });



        // TODO get the existing post title and content
        //   this will involve a database query, so the
        //   render will have to be done in a callback
        //
        // THIS DATA ALSO NEEDS TO BE INJECTED INTO THE
        // HANDLEBARS TEMPLATE - NO SUPPORT FOR THAT YET
        //
        // LIKELY AN {{#if}} WILL BE INVOLVED

    } else {
        // ERROR
        console.log("invalid post invocation: '" + req.url + "'");
        console.log(req.query);
        res.redirect("/error");
    }
});

router.post("/postform", function (req, res) {
    // COMMON FIELDS
    //   req.body.post_title - the post title
    //   req.body.post_content - the post content
    //
    // The `post_type` strings below come from
    // the `/postform` GET above and if they are
    // changed there they will also need to be
    // changed here
    if (req.body.post_type === "new thread") {
        // create new thread

        db.Thread.create({
            threadTitle: req.body.post_title,
            userId: 1, // session management will provide credentials
            categoryId: req.body.post_id
        }).then(function (newthread) {
            db.Post.create({
                threadId: newthread.threadId,
                postTitle: req.body.post_title,
                postContent: req.body.post_content,
                userId: newthread.userId
            }).then(function (newpost) {
                // EVENTUALLY
                //   subscribe the user to the thread as well
                // when user creates post, automatically subscribed
                // db.Subscription.create userid and thread id
                // no waiting for the result on this
                // after creating, then subscribe, then return to redirect (three levels of .then)
                res.redirect("/viewthread/" + newpost.threadId);
            });
        });
    } else if (req.body.post_type === "reply to thread") {
        // reply to an existing thread
        //   db.Post.create
        //     using `post_id` as the `threadId` threadId: req.body.post_id
        db.Post.create({
            threadId: req.body.post_id,
            postTitle: req.body.post_title,
            postContent: req.body.post_content,
            userId: 1
        }).then(function (newpost) {
            res.redirect("/viewthread/" + newpost.threadId);
        });

    } else if (req.body.post_type == "edit post") {
        // edit an existing post
        //   db.Post.update
        //     using `post_id` as the `postId`
        //     only update title and content
        //
        db.Post.update({
            postTitle: req.body.post_title,
            postContent: req.body.post_content
        },
            {
                where: {
                    postId: req.body.post_id
                }
            }).then(function () {
                db.Post.findOne({
                    where: {
                        postId: req.body.post_id
                    }
                }).then(function (updatedpost) {
                    res.redirect("/viewthread/" + updatedpost.threadId);
                });
            });
        // EVENTUALLY
        //   make sure the user can only edit their own posts
    } else {
        // ERROR
        console.log("unknown post type: '" + req.body.post_type + "'");
        res.redirect("/error");
    }
});


module.exports = router;

// creating a new thread then you have to create a new post in that thread
// creating a new post is simply just posting
// updating is updating it in the database