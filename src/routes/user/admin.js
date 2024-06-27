const express = require("express");

const adminRouter = express.Router();

adminRouter.get("/", function(req, res) {
	return res.render("user/admin", {
		title: "Administration panel",
		tagline: "Create and administrate your job positions from here"
	});
});

module.exports = adminRouter;
