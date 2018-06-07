$(document).ready(function () {

    var threadAll = $(".thread-container");

    function getPosts(thread) {

        var threadList = thread || "";
        if (threadList) {
            threadList = "/viewthread/" + threadList;
        };
        $.get("/api/post" + threadList, function (data) {
            console.log("Post", data);
            posts = data;
            if (!posts || !posts.length) {
                displayEmpty();
            } else {
                initializeRows();
            }
        })
    }

    function displayEmpty() {
        threadAll.empty();
        var message = $("<h2>");
        message.html("This thread no longer exists");
        threadAll.append(message);
    }

    function initializeRows() {
        threadAll.empty();
        var postsToAdd = [];
        for (var i = 0; i < posts.length; i++) {
            postsToAdd.push(createNewRow(posts[i]));
        }
        threadAll.append(postsToAdd)
    }

});
