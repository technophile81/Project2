$(document).ready(function () {
    $("#new-event-form").show();

    //event listener for form submission

    $("#update-event").on("click", handleUpdateSubmission);

    // Getting jQuery references to the form fields
    let eventName = $("#event-name");
    let eventCat = $("#event-category");
    let eventDate = $("#event-date");
    let eventTimeS = $("#event-time-start");
    let eventTimeE = $("#event-time-end");
    let eventTimeZ = $("#event-timezone");
    let eventAdd1 = $("#event-address1");
    let eventAdd2 = $("#event-address2");
    let eventCity = $("#event-city");
    let eventState = $("#event-state");
    let eventZip = $("#event-zip");
    let eventDesc = $("#event-description");

    // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
    var url = window.location.search;
    var eventId;

    if (url.indexOf("?event_id=") !== -1) {
        eventId = url.split("=")[1];
        getEventData(eventId);
    }
    else {
        window.location.href = "/events";

    }

    // Gets data for the event we're editing
    function getEventData(id) {
        var queryUrl= "/api/events/" + id;


        $.get(queryUrl, function (data) {

            //ADD: && user === data.EventCreator.userId to check if user is event creator, but check log to access correctly
            console.log("event to edit data: " + JSON.stringify(data));
            //checks for a result 
            if (data) {
                console.log(data.AuthorId || data.id);
                // If this event exists, prefill form with data
                eventName.val(data.eventName); 
                eventCat.val(data.category);  
                eventDate.val(data.eventDate);  
                eventTimeS.val(data.startTime);  
                eventTimeE.val(data.endTime); 
                eventTimeZ.val(data.timezone);  
                eventAdd1.val(data.address1);  
                eventAdd2.val(data.address2);  
                eventCity.val(data.city);  
                eventState.val(data.state);  
                eventZip.val(data.postalCode);  
                eventDesc.val(data.description);  
            
              
            }
        });
    }

    //grabs info from the form to update
    function handleUpdateSubmission(event){
        event.preventDefault();
        let catImage;

        //ADD event image logic

        var eventUpdate = {
            eventName: $("#event-name").val().trim(),
            category: $("#event-category option:selected").val().trim(),
            eventDate: $("#event-date").val().trim(),
            startTime: $("#event-time-start").val().trim(),
            endTime: $("#event-time-end").val().trim(),
            timezone: $("#event-timezone option:selected").val().trim(),
            address1: $("#event-address1").val().trim(),
            address2: $("#event-address2").val().trim(),
            city: $("#event-city").val().trim(),
            state: $("#event-state option:selected").val().trim(),
            postalCode: $("#event-zip").val().trim(),
            description: $("#event-description").val().trim(),
        };

        if(eventUpdate.category === "support"){
            catImage = "/images/alex-martinez-43505-unsplash.jpg";
        }else if(eventUpdate.category === "meetup"){
            catImage ="/images/frankie-38297-unsplash.jpg";
        }else{
            catImage = "/images/victor-freitas-546919-unsplash.jpg";
        }
        
        eventUpdate.imageUrl = catImage;

        updatePost(eventUpdate);

    }


    // Update the event, bring user to that event's page when done
    function updatePost(eventUpdate) {
        $.ajax({
            method: "PUT",
            url: "/api/events/" + eventId,
            data: eventUpdate
        })
        .then(function () {
                window.location.href = "/events/" + eventId;
            });
    }

    // function chooseImage(data){
    //     if(data === "support"){
    //         catImage = "/images/alex-martinez-43505-unsplash.jpg";
    //     }else if(data === "support"){
    //         catImage ="/images/frankie-38297-unsplash.jpg";
    //     }else{
    //         catImage = "/images/victor-freitas-546919-unsplash.jpg";
    //     }
    //     return catImage;
    // }
});
