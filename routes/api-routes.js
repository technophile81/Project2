//var testApiController = require("../controllers/testApi");

var categoriesController = require("../controllers/categories");

module.exports = function(app) {

  app.use(categoriesController);


};