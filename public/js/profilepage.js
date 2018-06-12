$(document).ready(function () {

    function toggleFollower() {
        var followedButtonId = this.id;
        var threadId = $(this).data("userid");
        var newFollowedState = true;

        if ($("#" + followedButtonId + " > i").hasClass("fas")) {
            newFollowedState = false;
        }

        $.ajax({
            method: "PUT",
            url: "/api/viewuser/" + userId,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify({
                following: newFollowedState,
            }),
            success: function (res) {
                $("#" + followedButtonId + " > i").removeClass("fas far");
                if (res.following) {
                    $("#" + followedButtonId + " > i").addClass("fas");
                } else {
                    $("#" + followedButtonId + " > i").addClass("far");
                }
            }
        });            
    }

    $(".followed").click(toggleFollower);
});