
$(document).ready(function () {

    $("#new-event-form").hide();

    //if users want to add an event, the event form appears
    $("#add-new-event").on("click", handleNewEvent);

    //sort all events to view by category
    $(".categorysort").on("click", "button", goToCategory);

    //allows users to go to a single event, which they must do in order to comment
    $(".addComment").on("click", goToEventPage);
    $(".viewEvent").on("click", goToEventPage);

    //handles delete event request
    $(".deleteEvent").on("click", deleteEvent);

    //// Update an event

    $(".editEvent").on("click", editEventFields);

    //comment on an event
    $("#submit-comment").on("click", addEventComment);
    //delete a comment
    $(".deleteComment").on("click", deleteEventComment);

    //sort all events to retrieve only those in a certain category
    $(".categorySort").on("click", "button", goToCategory);

    //allows the user to input zip code and find nearby events
    $(".zip-search-btn").on("click", findEventsByZip);

    ///////////////////////functions used above

    // function handleUpdateSubmission(event){
    //     event.preventDefault();
    //     let catImage;

    //     //ADD event image logic

    //     var eventUpdate = {
    //         eventName: $("#event-name").val().trim(),
    //         category: $("#event-category option:selected").val().trim(),
    //         eventDate: $("#event-date").val().trim(),
    //         startTime: $("#event-time-start").val().trim(),
    //         endTime: $("#event-time-end").val().trim(),
    //         timezone: $("#event-timezone option:selected").val().trim(),
    //         address1: $("#event-address1").val().trim(),
    //         address2: $("#event-address2").val().trim(),
    //         city: $("#event-city").val().trim(),
    //         state: $("#event-state option:selected").val().trim(),
    //         postalCode: $("#event-zip").val().trim(),
    //         description: $("#event-description").val().trim(),
    //     };

    //     if(eventUpdate.category === "support"){
    //         catImage = "/images/alex-martinez-43505-unsplash.jpg";
    //     }else if(eventUpdate.category === "meetup"){
    //         catImage ="/images/frankie-38297-unsplash.jpg";
    //     }else{
    //         catImage = "/images/victor-freitas-546919-unsplash.jpg";
    //     }
        
    //     eventUpdate.imageUrl = catImage;

    //     updatePost(eventUpdate);

    // }


    // // Update the event, bring user to that event's page when done
    // function updatePost(eventUpdate) {
    //     $.ajax({
    //         method: "POST",
    //         url: "/api/events/" + eventId,
    //         data: eventUpdate
    //     })
    //     .then(function () {
    //             window.location.href = "/events/" + eventId;
    //         });
    // }

    //shows the new event form
    function handleNewEvent() {
        let show= $(this).attr("data-show-value");
        if(show == "false"){
            $("#new-event-form").show();
            $(this).attr("data-show-value", "true");
            $(this).text("   - Hide Form ");
        }else{
            $("#new-event-form").hide();
            $(this).attr("data-show-value", "false");
            $(this).text(" + Add New Event");

        }
    }

    //sends users to the page displaying a single event
    function goToEventPage() {
        let eventId = $(this).attr("data-event-id");

        window.location.href = "/events/" + eventId;
    }

    function editEventFields() {

        // console.log("initial edit button clicked")
        // $(this).hide();

        let eventId = $(this).attr("data-event-id");
        console.log(eventId);

        window.location.href = "/event/edit/" + eventId + "?event_id=" + eventId;


        //end edit data function
    };


    //// Delete an event

    function deleteEvent() {
        let eventId = $(this).attr("data-event-id");

        if (eventId) {
            $.ajax({
                method: "DELETE",
                url: "/api/events/" + eventId
            }).then(function (data) {
                //what to do after deleting the post
                console.log(data);
                location.reload();
            });
        };
    };

    $(".unattend").on("click", unAttendEvent);
    $(".attend").on("click", attendEvent);

    //// Attend an event

    function attendEvent() {
        event.preventDefault();
        let eventId = $(this).attr("data-event-id");
        if (eventId) {
            $.ajax({
                method: "POST",
                url: "/api/eventsattending/" + eventId
            }).then(function (data) {
                //what to do after deleting the post
                console.log("You're going to this event!");
                location.reload();
            });
        };


    }

    //// Un-Attend an event

    function unAttendEvent() {
        event.preventDefault();

        let eventId = $(this).attr("data-event-id");
        if (eventId) {
            $.ajax(
                {
                    method: "DELETE",
                    url: "/api/eventsattending/" + eventId
                }).then(function (data) {
                    //what to do after deleting the post
                    console.log("You're NOT going to this event!");
                    location.reload();
                });
        };


    }

    //// Comment on an event

    function addEventComment(event) {
        event.preventDefault();
        let commentContent = $("#new-comment-text").val().trim();
        let eventId = $(this).attr("data-event-id");

        console.log("new comment to create:" + commentContent)
        let newComment = {
            content: commentContent
        };

        $.ajax(
            {
                method: "POST",
                url: "/api/events/" + eventId + "/comments",
                data: newComment
            }).then(function (data) {
                console.log("You've commented on this event!");
                $("#new-comment-text").val("");
                location.reload();
            });
    }


    //// Delete a comment
    function deleteEventComment() {
        let commentId = $(this).attr("data-event-id");

        if (commentId) {
            $.ajax({
                method: "DELETE",
                url: "/api/events/comments/" + commentId
            }).then(function (data) {
                //what to do after deleting the post
                console.log(data);
                location.reload();
            });
        };
    }



    function goToCategory() {

        let categoryId = $(this).val();
        console.log(categoryId);

        //create route to get the event id info and send it to render on handlebars form
        window.location.href = "/events/sort/" + categoryId;


        //end goToCategory function
    };

    function findEventsByZip(event) {
        event.preventDefault();
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                    console.log(JSON.stringify("clicked"));
                    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

        let userZip = $(".zip-search-content").val();

        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                    console.log(JSON.stringify("User Zip: \n" + userZip));
                    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

        if(userZip.toString().length === 5){
            //sends get request to zip code api to retrieve nearby zip codes
            $.ajax({
                method: "GET",
                url: "https://www.zipcodeapi.com/rest/n1Gqg95U4If2vVNJA9gvQa0tqcHXWvyddOKVgodYox1TVDlLXdmz2ZmGcgC70ulK/radius.json/"+ userZip +"/10/miles"
            }).then(function (data) {
                console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                    console.log(JSON.stringify("AJAX request sent to zip api and data: \n" + data));
                    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                let nearZipCodes = data.zip_codes;
                let nearEvents = [];

                let personalZip = {
                    zip_code: userZip
                }

                nearZipCodes.push(personalZip);

                if(nearZipCodes){

                    for(let i = 0; i<nearZipCodes.length; i++){
                    $.ajax({
                        method:"GET",
                        url: "/api/events/zip/" + nearZipCodes[i].zip_code
                    }).then(function(events){
                        nearEvents.push(events);
                    });
                    }
                    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                    console.log(JSON.stringify(nearEvents));
                    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

                }else{
                    invalidZip();
                }

            });


        }else{
            invalidZip();
        }
    }

    //what to do if the user's entered zip code doesn't work
    function invalidZip(){
        $(".zip-search-content").val("Enter a valid zip code");
            $(".zip-search-content").css("border", "1px solid red");
    }

    //end of document.ready
});
