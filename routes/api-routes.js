//var testApiController = require("../controllers/testApi");

var categoriesController = require("../controllers/categories");
var threadsController = require("../controllers/threads");
var postsController = require("../controllers/posts");

module.exports = function(app) {
  app.use(categoriesController);
  app.use(threadsController);
  app.use(postsController);
};