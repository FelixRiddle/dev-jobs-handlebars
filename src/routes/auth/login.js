const express = require("express");
const { authenticateUser } = require("../../lib/controller/authenticateUser");
const expandData = require("../../lib/misc/expand");

const loginRouter = express.Router();

loginRouter.get("/", function(req, res) {
	try {
		if(req.user) {
			return res.redirect("/");
		}
		
		return res.render("auth/login", {
			title: "Log in to devJobs",
			tagline: "Login",
			...expandData(req),
		});
	} catch(err) {
		console.error(err);
        return res.redirect("500");
	}
});

loginRouter.post("/", authenticateUser);

module.exports = loginRouter;
