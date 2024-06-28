const express = require("express");
const { authenticateUser } = require("../../lib/controller/authenticateUser");

const loginRouter = express.Router();

loginRouter.get("/", function(req, res) {
	try {
		if(req.user) {
			return res.redirect("/");
		}
		
		return res.render("auth/login", {
			title: "Log in to devJobs",
			tagline: "Login",
		});
	} catch(err) {
		console.error(err);
        return res.redirect("500");
	}
});

loginRouter.post("/", authenticateUser);

module.exports = loginRouter;
