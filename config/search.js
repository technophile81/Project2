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

// var db = require("../models");
// var isAuthenticated = require("../config/middleware/isAuthenticated");

var connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "vetPTSDapp",
  port: 8889,
  

});

connection.connect();
connection.query("SELECT * FROM Post", (err, results) => {
  if (err) throw err;
  index.addObjects(results);
});


// index.setSettings(
//   {
//     searchableAttributes: ["postId", "postTitle", "postContent"]
//   },
//   function(err, content) {
//     console.log(content);
//   }
// );

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
