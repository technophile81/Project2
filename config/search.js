// var algoliasearch = require('algoliasearch/reactnative');
// var algoliasearch = require('algoliasearch/lite');
// import * as algoliasearch from 'algoliasearch'; // When using TypeScript

// or just use algoliasearch if you are using a <script> tag
// if you are using AMD module loader, algoliasearch will not be defined in window,
// but in the AMD modules of the page
var algoliasearch = require("algoliasearch");
var client = algoliasearch("O5KV8UHS7Z", "706ab1fa41ac551a10cce67aa3423cd0");
var index = client.initIndex("test");

var mysql = require("mysql");

var db = require("../models");

index.setSettings({
  searchableAttributes: [
    "userName",
    "postTitle",
    "postContent",
  ],
  attributesToSnippet: [
    "postContent:80",
  ],
}, function (err, content) {
  console.log(content);
});

function addPostToIndex(postId) {
  db.Post.findOne({
    where: { postId: postId },
    include: [
      { model: db.User },
      {
        model: db.Thread,
        include: [
          { model: db.Category },
        ]
      },
    ],
  }).then(function (postData) {

    let searchObject = {
      'objectID': 'post:' + postData.postId,
      'postId': postData.postId,
      'postTitle': postData.postTitle,
      'postContent': postData.postContent,
      'categoryName': postData.Thread.Category.categoryName,
      'threadId': postData.threadId,
      'userId': postData.userId,
      'userName': postData.User.name,
    };

    index.addObjects([searchObject]);
  });
}

module.exports = addPostToIndex;

// index.search("title").then(result => {
//   console.log(result.nbHits);

//   for (var hit of result.hits) {
//     console.log(hit);
//   }
// });
// var express = require("express");
// var router = express.Router();

// var contactsJSON = require("./contacts.json");

// index.addObjects(contactsJSON, function(err, content) {
//   if (err) {
//     console.error(err);
//   }
// });

// index.setSettings(
//   {
//     customRanking: ["desc(followers)"]
//   },
//   function(err, content) {
//     console.log(content);
//   }
// );
