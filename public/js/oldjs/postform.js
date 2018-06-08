$(document).ready(function () {

    // Getting jQuery references to the post body, title, form, and category

    var bodyInput = $("#body");
    var titleInput = $("#title");
    var postForm = $("#post-form");
    var currentThread = $("#thread-name")
    var postCategory = $("#category");

    $(postForm).on("submit", handleFormSubmit);

    var catId;
    var postId;
    var authorId;
    var threadId;
    var url = new URL(window.location.href);

    var updating = false;

    // if (url.indexOf("?post_id=") !== -1) {
    //     postId = url.split("=")[1];
    //     getPostData(postId);
    //     updating = true;
    // } else if (url.indexOf("?thread_id=") !== -1) {
    //     threadId = url.split("=")[1];
    //     updating = true;
    // } else if (url.indexOf("?category_id=") !== -1) {
    //     catId = url.split("=")[1];
    //     getCategoryName(catId);
    //     updating = true;
    // }

    var category_id = url.searchParams.get("category_id");
    if (category_id) {
        catId = url.split("=")[1];
        getCategoryName(catId);
        updating = true;
    };
    // Invokes function to get all threads 
    getThreads();

    // Handles clicks for category list
    var catSelect = $(".list-group button");

    // Retrieves button value
    catSelect.click(function (category) {
        alert($(this).attr("value"));
        window.location.href = "/category?category_id=" + category.categoryId;
        return false;
    });
    console.log(catSelect);

    // When form is submitted...
    function handleFormSubmit(event) {

        event.preventDefault();
        //Won't submit the post if we're missing body or title
        if (!titleInput.val().trim() || !bodyInput.val().trim()) {
            return;
        } // won't need this because validation in models?

        var newThread;
        // Constructing a newPost object to hand to the database
        var newPost = {

            postTitle: titleInput.val().trim(),
            postContent: bodyInput.val().trim(),
            categoryName: postCategory.val()
        };
        // If new thread, make post name = thread name
        // and add post to category list


        console.log(newPost);

        // If we're updating a post run updatePost to update a post
        // Otherwise run submitPost to create a whole new post

        if (updating) {

            newPost.id = postId;
            updatePost(newPost);
        } else {
            submitPost(newPost);
        };
    };

    function getThreads() {
        $.get("/api/thread", renderThreadList);
    };

    function renderThreadList(data) {
        if (!data.length) {
            window.location.href = "/thread";
        }
        //$(".hidden").removeClass("hidden");
        var rowsToAdd = [];
        for (var i = 0; i < data.length; i++) {
            rowsToAdd.push(createThreadRow(data[i]));
        }
        currentThread.empty();
        currentThread.append(rowsToAdd);
        currentThread.append(threadId);
    }

    function createThreadRow(thread) {
        var threadArea = $("<div>");
        threadArea.text(thread.postName);
        threadArea.text(thread.userId.name);
    }


    // Submits a new post and brings user to forum thread upon completion
    function submitPost(Post) {
        $.post("/api/post", Post, function () {
            window.location.href = "/thread" + Post.threadId;
        });
    }

    //Gets post data for a post we're editing

    function getPostData(id) {

        $.get("/api/post/" + id, function (data) {
            // If this post exists, prefill form with its data
            titleInput.val(data.postTitle);
            bodyInput.val(data.postContent);
            //postCategorySelect.val(data.threadName);
            // If we have a post with this ID, set flag for us to know to update post
            // when we hit submit 
            updating = true;
        });
    }

    function getCategoryName(id) {

    }

    // NEED THE UPDATE TOGGLE TO ONLY DISPLAY FOR POST AUTHOR
    // Update given post, bring user to thread when done

    function updatePost(post) {

        $.ajax({
            method: "PUT",
            url: "/api/post/" + post.id,
            data: post
        })
            .then(function () {
                window.location.href = "/postdisplay";
            })
    };

    function renderThreadList(data) {

        if(!data.length) {

            window.location.href = "/viewcategory?category_id=" + Category.categoryId;
        }
        var rowsToAdd = [];
        for (var i = 0; i < data.length; i++) {
            rowsToAdd.push(createThreadRow(data[i]));
        }
        
    }

});