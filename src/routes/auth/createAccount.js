const express = require("express");
const User = require("../../model/User");
const { body, validationResult } = require("express-validator");
const getUrl = require("../../lib/config/url");
const expandData = require("../../lib/misc/expand");

const createAccount = express.Router();

const createAccountMetadata = {
	title: "Create account at devJobs",
	tagline: "Fill the formulary to create your new account and start recruiting/posting for free!",
};

// Auth will have to be unified with express authentication.
createAccount.get("/", function(req, res) {
	try {
		if(req.user) {
			return res.redirect("/");
		}
		
		return res.render("auth/create-account", {
			...createAccountMetadata,
			...expandData(req),
		});
	} catch(err) {
		console.error(err);
		return res.redirect("/500");
	}
});

/**
 * Create account route
 * 
 * This is to be used as a REST API, so it doesn't uses any redirects or html.
 */
createAccount.post(
	"/",
	// Now express validator automatically sanitizes data
	body("name", "Name is required").escape().notEmpty(),
	body("email", "Email is required").escape().notEmpty(),
	body("email", "The given E-Mail is incorrect").isEmail(),
	// Is there a need to escape the password?
	// It's not like everybody will see it 😂😂😂
    body("password", "Password is required").escape().notEmpty(),
	body("password", "The password is not strong").isStrongPassword(),
	// I think confirm password is just a frontend thing
    body("confirmPassword", "Confirm password is required").escape().notEmpty(),
	async function createAccount(req, res, next) {
		try {
			console.log(`[POST] /auth/create-account`);
			
			// Validate password here because I don't know how to with express validator
			if(req.body.password !== req.body.confirmPassword) {
				return res.status(400).send({
					messages: [{
                        message: "Passwords don't match",
                        error: true,
                    }],
				});
			}
			
			// Validate data
			const result = validationResult(req);
			if (!result.isEmpty()) {
				const messages = result.array().map((error) => {
					return {
						message: error.msg,
						error: true,
					};
				});
				
				req.flash('messages', messages);
				
				return res.status(400).send({
					messages: [
						...req.flash().messages
					],
				});
			}
			
			// Create user
			const user = new User(req.body);
			try {
				await user.save();
			} catch(err) {
				req.flash("messages", [{
					message: "The given E-Mail is taken",
					error: true,
				}]);
				return res.status(400).send({
					messages: [...req.flash().messages],
				});
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
	}
);

/**
 * Create account with redirect
 */
createAccount.post(
	"/redirect",
	// Now express validator automatically sanitizes data
	body("name", "Name is required").escape().notEmpty(),
	body("email", "Email is required").escape().notEmpty(),
	body("email", "The given E-Mail is incorrect").isEmail(),
	// Is there a need to escape the password?
	// It's not like everybody will see it 😂😂😂
    body("password", "Password is required").escape().notEmpty(),
	body("password", "The password is not strong").isStrongPassword(),
	// I think confirm password is just a frontend thing
    body("confirmPassword", "Confirm password is required").escape().notEmpty(),
	async function createAccount(req, res, next) {
		const url = getUrl();
		try {
			console.log(`[POST] /auth/create-account/redirect`);
			
			// Validate password here because I don't know how to with express validator
			if(req.body.password !== req.body.confirmPassword) {
				req.flash("messages", [{
					message: "Passwords don't match",
					error: true,
				}]);
				return res.render(`auth/create-account`, {
					...createAccountMetadata,
					...expandData(req),
				});
			}
			
			const result = validationResult(req);
			if (!result.isEmpty()) {
				const messages = result.array().map((error) => {
					return {
						message: error.msg,
						error: true,
					};
				});
				
				req.flash('messages', messages);
				
				return res.render(`auth/create-account`, {
					...createAccountMetadata,
					...expandData(req),
				});
			}
			
			// Create user
			const user = new User(req.body);
			try {
				await user.save();
			} catch(err) {
				req.flash("messages", [{
					message: "The given E-Mail is taken",
					error: true,
				}]);
				return res.render(`auth/create-account`, {
					...createAccountMetadata,
					...expandData(req),
				});
			}
			
			return res.redirect(`${url}auth/login`);
		} catch(err) {
			console.error(err);
			return res.redirect(`${url}/500`);
		}
	}
);

module.exports = createAccount;

