// requires that you need
var express = require("express");

var router = express.Router();

var isAuthenticated = require("../config/middleware/isAuthenticated");


router.get("/assessment", isAuthenticated, function(req, res) {
    var hbsObject = {};
    res.renderWithContext("assessment", hbsObject);
});

module.exports = router;