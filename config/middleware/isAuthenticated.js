var db = require("../../models");

// This is middleware for restrictng routes a user is not allowed to visit if not logged in
module.exports = function(req, res, next) {
  // If the user is logged in, continue with the request to the restricted route
  if (req.user) {
    db.User.findOne({
      where: { userId: req.user.userId }
    }).then(function (userdata) {
      // require users to edit their profile before being able to do anything
      // but edit their profile
      //
      // the weird comparison of createdAt/updatedAt is due to datetimes not
      // comparing equal unless first forced to strings

      req.user.User = userdata;

      if (req.url !== "/editprofile" && (userdata.createdAt + "") === (userdata.updatedAt + "")) {
        return res.redirect("/editprofile");
      } else {
        return next();
      }
    });
  } else {
    // If the user isn't logged in, redirect them to the login page
    return res.redirect("/login?return_to=" + req.url);
  }
};
