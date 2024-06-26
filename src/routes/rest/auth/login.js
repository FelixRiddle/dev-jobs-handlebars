const express = require("express");
const generateJwtToken = require("../../../lib/auth/generateToken");
const User = require("../../../model/User");
const validatePassword = require("../../../lib/auth/validatePassword");

const loginRouter = express.Router();

/**
 * Validate and login a user
 */
async function validateAndLogin(req, res) {
	try {
		console.log(`[POST] /rest/auth/login`);
		
		const {
			email, password
		} = req.body;
		if(!email || !password) {
			return res.status(400).send({
                messages: [{
                    message: "Both the email and password are required",
                    error: true,
                }],
            });
		}
		
		// Find user in the database
		const user = await User.findOne({
			email,
		}).lean();
		
		// Validate password
		const passwordOk = validatePassword(password, user.password);
		if(!passwordOk) {
			return res.status(401).send({
                messages: [{
                    message: "Email or password incorrect",
                    error: true,
                }],
            });
		}
		
		// Remove password
		delete user.password;
		
		const token = generateJwtToken(user);
		
		return res
			.cookie("token", token, {
				httpOnly: false,
			}).send({
				messages: [{
					message: "Logged in",
					error: false,
				}],
				token,
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

/**
 * Have to manually implement login for the nextjs frontend
 */
loginRouter.post("/", validateAndLogin);

module.exports = loginRouter;
