const express = require("express");

const logoutRouter = express.Router();

logoutRouter.get("/logout", (req, res) => {
	req.logout();
	
	return res.redirect("/");
});

module.exports = logoutRouter;
