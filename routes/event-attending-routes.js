var path = require("path");
var db = require("../models");
var express = require("express");
var sequelize = require("sequelize");
var passport = require("../config/passport");

var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

    //////////-----------Attend Event Subscriptions
    app.post("/api/eventsattending/:id", isAuthenticated, function(req, res){
        
        console.log(req.user.userId)
            db.User.findById(req.user.userId).then(function(assignedUser){
                console.log("user object? :" + assignedUser);
                //through may need to be the name of the through table instead
                //creates an association for the attending join table
                assignedUser.addEvent_ID(req.params.id).then(function(data){
                    res.json(data);
                });
            }).catch(function(error){
            console.log(error)
        });

    });

    app.delete("/api/eventsattending/:id", isAuthenticated, function(req, res){
        console.log("in event attending routes, event id: " + req.params.id + " userid: " + req.user.userId);
        
        db.User.findById(req.user.userId).then(function(assignedUser){
            console.log("event object? :" + assignedUser);
            assignedUser.removeEvent_ID(req.params.id).then(function(data){
                res.json(data);
            });
        }).catch(function(error){
            console.log(error);

      });

    });

//end module.exports
}