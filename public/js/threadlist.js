$(document).ready(function () {

    function toggleSubscribe() {
        var subscribedButtonId = this.id;
        var threadId = $(this).data("threadid");
        var newSubscribedState = true;

        if ($("#" + subscribedButtonId + " > i").hasClass("fas")) {
            newSubscribedState = false;
        }

        $.ajax({
            method: "PUT",
            url: "/api/subscription/" + threadId,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify({
                subscribed: newSubscribedState,
            }),
            success: function (res) {
                $("#" + subscribedButtonId + " > i").removeClass("fas far");
                if (res.subscribed) {
                    $("#" + subscribedButtonId + " > i").addClass("fas");
                } else {
                    $("#" + subscribedButtonId + " > i").addClass("far");
                }
            }
        });            
    }

    $(".subscribed").click(toggleSubscribe);
});

