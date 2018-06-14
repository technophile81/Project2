var express = require("express");
var algoliasearch = require('algoliasearch/lite');

var router = express.Router();

// Import the model to use its database functions.
var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");

var searchClient = algoliasearch('O5KV8UHS7Z', 'fc48dc961fcb9448489cdc568bbbc88c');
var searchIndex = searchClient.initIndex('test');


router.get("/viewsearch", isAuthenticated, function (req, res) {
    searchIndex.search({
        query: req.query.q,
    }).then(function (content, err) {

        let hbsObject = {
            numHits: 0,
            searchQuery: req.query.q,
            hits : [],
        };

        if (!err) {
            hbsObject.hits = content.hits;
            hbsObject.numHits = content.hits.length;
        }
        res.renderWithContext("viewsearch", hbsObject);
    });
});

module.exports = router;