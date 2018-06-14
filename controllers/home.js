var express = require("express");
var sequelize = require("sequelize");

var router = express.Router();

router.get("/home", function (req, res) {
        var hbsObject = {};

    res.render("home", hbsObject);
});

module.exports = router;