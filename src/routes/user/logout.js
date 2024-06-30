const express = require("express");

const logoutRouter = express.Router();

logoutRouter.get("/", (req, res) => {
	req.logout((err) => {
		console.error(err);
	});
	
	return res.redirect("/");
});

module.exports = logoutRouter;
