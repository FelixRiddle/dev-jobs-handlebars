const express = require("express");
const User = require("../../model/User");
const { body, validationResult } = require("express-validator");

const createAccount = express.Router();

const createAccountMetadata = {
	title: "Create account at devJobs",
	tagline: "Fill the formulary to create your new account and start recruiting/posting for free!",
};

// Auth will have to be unified with express authentication.
createAccount.get("/", function(req, res) {
	try {
		return res.render("auth/create-account", {
			...createAccountMetadata,
		});
	} catch(err) {
		console.error(err);
		return res.render("/500");
	}
});

/**
 * Create account route
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
	// They have to be checked so we don't use is strong password here
    body("confirmPassword", "Confirm password is required").escape().notEmpty(),
	body("confirmPassword", "The passwords don't match").equals(body("password")),
	function createAccount(req, res, next) {
		try {
			console.log(`[POST] /auth/create-account`);
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
			
			const user = new User(req.body);
			
			const newUser = user.save();
			if(!newUser) {
				return res.status(400).send({
					messages: [{
						message: "The user couldn't be created",
						error: true,
					}],
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
	// They have to be checked so we don't use is strong password here
    body("confirmPassword", "Confirm password is required").escape().notEmpty(),
	body("confirmPassword", "The passwords don't match").equals(body("password")),
	function createAccount(req, res, next) {
		try {
			console.log(`[POST] /auth/create-account/redirect`);
			const result = validationResult(req);
			if (!result.isEmpty()) {
				const messages = result.array().map((error) => {
					return {
						message: error.msg,
						error: true,
					};
				});
				
				req.flash('messages', messages);
				
				return res.render("auth/create-account", {
					...createAccountMetadata,
					messages: [
						...req.flash().messages
					],
				});
			}
			
			const user = new User(req.body);
			
			const newUser = user.save();
			if(!newUser) {
				// Does this redirects to 404?
				return next();
			}
			
			return res.redirect("auth/login")
		} catch(err) {
			console.error(err);
			return res.redirect("500");
		}
	}
);

module.exports = createAccount;

