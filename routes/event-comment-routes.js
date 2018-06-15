var path = require("path");
var db = require("../models");
var express = require("express");
var sequelize = require("sequelize");
var passport = require("../config/passport");

var isAuthenticated = require("../config/middleware/isAuthenticated");


//incorporate special join functions!
module.exports = function (app) {

    //retrieves all comments for an event
    // app.get("/api/events/:id/comments", function (req, res) {

    //     db.CalEvent.findById(req.params.id).then(function(dbCalEvent){
    //       dbCalEvent.getEventComment_IDs();
    //     });

    // });

    //adds a new comment to an event 
    app.post("/api/events/:id/comments", isAuthenticated, function(req, res){
        let newComment = req.body;
        newComment.userCreator = req.user.userId;

        db.EventComments.create(newComment).then(function(dbEventComment){
            console.log("Post - dbEventComment:" + dbEventComment);
            console.log("Post - paramsID:" + req.params.id);           

            //associates the comment with the correct event
            db.CalEvent.findById(req.params.id).then(function(assignedEvent){
                console.log("event object? :" + assignedEvent);
                assignedEvent.addEventComment_ID(dbEventComment);
                
                //associates the comment with the user
                db.User.findById(req.user.userId).then(function(assignedUser){
                    console.log("event object? :" + assignedUser);
                    assignedUser.addEventComment_ID(dbEventComment);

                    res.json(dbEventComment);
                });
              
            });
            
            
        }).catch(function(error){
                console.log(error);

          });
    });

    //updates an event

    app.put("/api/events/comments/:id", isAuthenticated, function(req, res){
        db.EventComments.update(
            req.body,
            {
                where: {
                    id: req.params.id
                }
        }).then(function(dbCalEvent){
            res.json(dbCalEvent)
         
        }).catch(function(error){
            console.log(error)
        });
    });

    //deletes an event
    app.delete("/api/events/comments/:id", isAuthenticated, function(req, res){
        
        db.EventComments.destroy({
            where: {
            id: req.params.id
            }
        }).then(function(dbCalEvent){
            res.json(dbCalEvent)
        });
        

    });

//end module.exports
}