var path = require("path");
var db = require("../models");
var express = require("express");
var sequelize = require("sequelize");
var passport = require("../config/passport");
var moment = require("moment");

var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {


  app.get("/event/edit/:id", isAuthenticated, function (req, res) {
    db.CalEvent.findOne({
        where: {
            id: req.params.id
        },
        include: [{model: db.User, as: "User_Id"}, {model: db.User, as: "EventCreator"},{model: db.EventComments, as:"EventComment_ID", include:[{model: db.User, as: "User_Id"}]}]
     }).then(function(dbCalEvent){
        res.renderWithContext("eventedit", dbCalEvent);
     });
    
  });
 

  //allows users to view all events
  app.get("/events", isAuthenticated, function(req, res){
    db.CalEvent.findAll(           
      {include: [{model: db.User, as: "User_Id"}, {model: db.User, as: "EventCreator"}]}
      ).then(function(CalEvents){
        console.log("in the router, getting all events, before rendering the view " );
        let result = {
            events: CalEvents
        };
        
        
        //formats the date and times for display
       for (let event of result.events){
        event.startTime = moment(event.startTime, "HH:mm:ss").format("HH:mm");
        event.endTime = moment(event.endTime, "HH:mm:ss").format("HH:mm");
       };


        let jsonString = JSON.stringify(result);
      
        res.renderWithContext("all-events", result);
    }).catch(function(error){
      console.log(error)
  });

  });

  //allows users to view a single event
  app.get("/events/:id", isAuthenticated, function(req, res){

    db.CalEvent.findAll({
      where: {
        id: req.params.id
    },
    
      include: [{model: db.User, as: "User_Id"}, {model: db.User, as: "EventCreator"}]
    
  }).then(function(dbCalEvents){
     
      let jsonString = JSON.stringify(dbCalEvents);
      console.log("_________________________________________________________")
      console.log("in the router, getting one event, before rendering the view: " + 
      jsonString);
      console.log("_________________________________________________________")
    if(dbCalEvents.length > 0){

        dbCalEvents[0].getEventComment_ID({include:[{model: db.User, as: "User_Id"}]}).then(function(dbcomments){
          let result = {
                  event: dbCalEvents,
                  comments: dbcomments
                  };


                  let jsonString = JSON.stringify(result);
                  console.log("There should be comments: "+jsonString)
            
            res.renderWithContext("one-event", result);
        }).catch(function(error){
          console.log(error)
      });
    }else{
      res.redirect("/events")
    }

    });

    
  });

    //retrieves one, specified event
    app.get("/api/events/:id", isAuthenticated, function(req, res){

       db.CalEvent.findOne({
           where: {
               id: req.params.id
           },
           include: [{model: db.User, as: "User_Id"}, {model: db.User, as: "EventCreator"},{model: db.EventComments, as:"EventComment_ID", include:[{model: db.User, as: "User_Id"}]}]
        }).then(function(dbCalEvent){
            res.json(dbCalEvent)
        });

    });
 


    //adds a new event to the database
    app.post("/events", isAuthenticated, function(req, res){
        //adds the user id of the person who created the event to the new event object
        let catImage;
        let newCalEvent = {
            eventName: req.body.eventName,
            category: req.body.category,
            eventDate: req.body.eventDate,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            timezone: req.body.timezone,
            address1:req.body.address1,
            address2: req.body.address2,
            city: req.body.city,
            state: req.body.state,
            postalCode:req.body.postalCode,
            description:req.body.description
            }

            if (newCalEvent.category === "support") {
                catImage = "/images/alex-martinez-43505-unsplash.jpg";
            } else if (newCalEvent.category === "meetup") {
                catImage = "/images/frankie-38297-unsplash.jpg";
            } else {
                catImage = "/images/victor-freitas-546919-unsplash.jpg";
            }
    
            newCalEvent.imageUrl = catImage;
        newCalEvent.UserCreatorId = req.user.userId;

        //creates a new event in the database
        db.CalEvent.create(newCalEvent).then(function(dbCalEvent){
            console.log("new event created!");
           
            dbCalEvent.addUser_Id(req.user.userId, {attending: true}).then(function(userAtt){

                dbCalEvent.addEventCreator(req.user.userId).then(function(creator){
                    // db.CalEvent.findAll(           
                    //     {include: [{model: db.User, as: "User_Id"}, {model: db.User, as: "EventCreator"}]}
                    //     ).then(function(CalEvents){
                    //       console.log("in the router, getting all events, before rendering the view " );
                    //       let result = {
                    //           user: req.user.userId,
                    //           events: CalEvents
                    //       };
                          
                    //       //formats the date and times for display
                    //      for (let event of result.events){
                    //          let date = event.eventDate.toString();
                    //          let start = event.startTime.toString();
                    //          let end = event.endTime.toString();
                    //       event.eventDate = moment(date, "YYYY-MM-DD").format("MMMM D Y");
                    //       event.startTime = moment(start).format("HH mm");
                    //       event.endTime = moment(end).format("HH mm");
                    //      };
                  
                  
                    //       let jsonString = JSON.stringify(result);
                        
                    //       res.renderWithContext("all-events", result);
                    //   });

                    res.redirect("/events/"+ dbCalEvent.id); 
                });
              //
            });
            
            }).catch(function(error){
                console.log(error)
            });

    });

    //updates an event

    app.put("/api/events/:id", isAuthenticated, function(req, res){
        db.CalEvent.update(
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
    app.delete("/api/events/:id", isAuthenticated, function(req, res){
        
        db.CalEvent.destroy({
            where: {
            id: req.params.id
            }
        }).then(function(dbCalEvent){
            res.json(dbCalEvent)
        });
        

    });

     //retrieves events from a specific category
     app.get("/events/sort/:category", isAuthenticated, function(req, res){
        db.CalEvent.findAll(           
          {where:{
              category: req.params.category
          },
          include: [{model: db.User, as: "User_Id"}, {model: db.User, as: "EventCreator"}]}
          ).then(function(CalEvents){
            if(CalEvents.length >0 ){
            console.log("in the router, getting all events, before rendering the view " );
            let result = {
                events: CalEvents,
                category: req.params.category
            };
            let jsonString = JSON.stringify(result);
            console.log(jsonString)
            res.renderWithContext("all-events", result);
        }else{
            res.redirect("/events"); 

        }
        }).catch(function(error){
          console.log(error)
      });
    
      });

      //retrieves events that a user is attending
     app.get("/api/user/events", isAuthenticated, function(req, res){
        db.User.findById(req.user.userId).then(function(currentUser){
            console.log("in the router, getting all events, before rendering the view " );
            currentUser.getEvent_ID(
                {include: [{model: db.User, as: "User_Id"}, {model: db.User, as: "EventCreator"}]}
            ).then(function(attendEvents){
                console.log("*************************************");
                console.log("trying to send user attending events from event routes");

                console.log("*************************************");


                // if(attendEvents.length > 0){
                let result = {
                    userAttendEvents: attendEvents,
                };
                let jsonString = JSON.stringify(result);
                console.log(jsonString)
                res.renderWithContext("partials/sidebar/sidebar", result);
            // }else{
            //     let noResult = {noevents: "You aren't attending any events yet."}
            //     res.render("partials/sidebar/sidebar", noResult);
    
            // }
            });  
           
        }).catch(function(error){
          console.log(error)
      });
    
      });

      //retrieves events with a matching zipcode
      app.get("/api/events/zip/:zip", isAuthenticated, function(req, res){

        db.CalEvent.findOne({
            where: {
                postalCode: req.params.zip
            },
            include: [{model: db.User, as: "User_Id"}, {model: db.User, as: "EventCreator"},{model: db.EventComments, as:"EventComment_ID", include:[{model: db.User, as: "User_Id"}]}]
         }).then(function(dbCalEvent){
             res.send(dbCalEvent)
         });
 
     });


//end module.exports
};

