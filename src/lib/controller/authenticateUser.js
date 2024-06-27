const passport = require("passport");

exports.authenticateUser = passport.authenticate('local', {
	// successRedirect: "/user/admin",
	// failureRedirect: "/auth/login",
	failureFlash: true,
	badRequestMessage: "Both fields are required"
});
