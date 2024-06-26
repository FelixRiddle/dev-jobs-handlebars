const express = require("express");
const User = require("../../model/User");

const createAccount = express.Router();

// Auth will have to be unified with express authentication.
createAccount.get("/", function(req, res) {
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

createAccount.post("/", async function (req, res) {
	try {
		const user = new User(req.body);
		
		console.log(user);
		
		const newUser = user.save();
		if(!newUser) {
			return next();
		}
		
		return res.send({
			messages: [{
                message: "Account created",
                error: false,
            }],
		});
	} catch(err) {
		console.error(err);
        return res.status(500).send({
			messages: [{
                message: "Internal error",
                error: true,
            }],
		});
	}
});

module.exports = createAccount;

