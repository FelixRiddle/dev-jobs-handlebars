const express = require("express");

const authRouter = express.Router();

// Auth will have to be unified with express authentication.
authRouter.get("/create-account", function(req, res) {
	try {
		
		return res.render("auth/create-account", {
			title: "Create account at devJobs",
            tagline: "Fill the formulary to create your new account and start recruiting/posting for free!",
		});
	} catch(err) {
		console.error(err);
		return res.render("/500");
	}
});

module.exports = authRouter;

