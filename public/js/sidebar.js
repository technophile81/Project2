console.log("*************************************");
                console.log("trying to send user attending events from sidebar.js");

                console.log("*************************************");

$.get("/api/user/events", function (data) {
    console.log("sidebar ajax complete")
});