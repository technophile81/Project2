$(document).ready(function () {

    function toggleFollower() {
        var followedButtonId = this.id;
        var userId = $(this).data("userid");
        var newFollowedState = true;

        if ($("#" + followedButtonId + " > i").hasClass("fas")) {
            newFollowedState = false;
        }

        $.ajax({
            method: "PUT",
            url: "/api/follow/" + userId,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify({
                following: newFollowedState,
            }),
            success: function (res) {
                $("#" + followedButtonId + " > i").removeClass("fas far"); 
                if (res.following) {
                    $("#" + followedButtonId + " > i").addClass("fas");
                    $("#" + followedButtonId + " > i").text(" Unfollow");

                } else {
                    $("#" + followedButtonId + " > i").addClass("far");
                    $("#" + followedButtonId + " > i").text(" Follow");
                }
            }
        });            
    }

    $(".followed").click(toggleFollower);
});