const express = require("express");
const User = require("../../../../../model/User");
const validateResult = require("../../../../../lib/validation/validateResult");
const expandData = require("../../../../../lib/misc/expand");
const { body } = require("express-validator");
const { DEFAULT_MAX_LENGTH } = require("../../../../job/create");

const editRouter = express.Router();

editRouter.post(
	"/",
	// Name
	body("name", "Name is required").escape().notEmpty(),
	body("name", "Name is too long").isLength({ max: DEFAULT_MAX_LENGTH }),
	// Email
	body("email", "Email is required").escape().notEmpty(),
	body("email", "That is not an email").isEmail(),
	body("email", "Email is too long").isLength({ max: DEFAULT_MAX_LENGTH }),
	async (req, res) => {
		try {
			// Validate the data
			const messages = validateResult(req);
			if(messages) {
				return res.status(400).send({
					...expandData(req),
                    ...req.body,
                });
			}
			
			const user = await User.findById(req.user._id);
			
			user.name = req.body.name;
			user.email = req.body.email;
			
			if(req.body.password) {
				user.password = req.body.password;
			}
			
			await user.save();
			
			return res.send({
				messages: [{
					message: "Updated",
					error: false,
				}]
			});
		} catch(err) {
			console.error(err);
			return res
				.status(500)
				.send({
					messages: [{
						message: "Internal error",
						error: true,
					}]
				});
		}
	}
);


module.exports = editRouter;
