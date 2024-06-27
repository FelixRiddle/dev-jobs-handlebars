const express = require("express");

const loginRouter = express.Router();

loginRouter.get("/", function(req, res) {
	try {
		return res.render("auth/login", {
			title: "Log in to devJobs",
			tagline: "Login",
		});
	} catch(err) {
		console.error(err);
        return res.redirect("500");
	}
});

loginRouter.post("/", function(req, res) {
	try {
		
	} catch(err) {
		console.error(err);
        return res.send({
			messages: [{
                message: "Internal error",
                error: true,
            }],
		});
	}
});

module.exports = loginRouter;
