const express = require("express");
const validateTokenRouter = require("./validate");
const { internalErrorMessage } = require("../../../../lib/messages");
const User = require("../../../../model/User");

const createPasswordRouter = express.Router();

createPasswordRouter.use("/validate", validateTokenRouter);

createPasswordRouter.post("/", async (req, res) => {
	try {
		console.log(`[${req.method}] ${req.path}`);
		
		const {
			token, password, confirmPassword
		} = req.body;
		
		const passwordsMatch = password === confirmPassword;
		if(!passwordsMatch) {
			return res.status(400).send({
				messages: [{
					message: "Passwords don't match",
					error: true,
				}]
			})
		}
		
		// Validate the user is the owner
		// To prevent anyone messing with endpoints, that could skip the validation part
		const user = await User.findOne({
			token
		});
		if(!user) {
			return res.status(400).send({
				messages: [{
					message: "User doesn't exists or token is incorrect",
					error: true,
				}]
			});
		}
		
		user.password = password;
		
		await user.save();
		
		return res.send({
			messages: [{
				message: "Password changed",
				error: false,
			}]
		});
	} catch(err) {
		console.error(err);
		
		return res.status(500).send({
			messages: [internalErrorMessage]
		});
	}
});

module.exports = createPasswordRouter;

