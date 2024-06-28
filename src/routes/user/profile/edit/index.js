const express = require("express");

const User = require("../../../../model/User");
const expandData = require("../../../../lib/misc/expand");
const { body } = require("express-validator");
const { DEFAULT_MAX_LENGTH } = require("../../../job/create");
const validateResult = require("../../../../lib/validation/validateResult");
const uploadImage = require("../../../../middleware/uploadImage");

const editRouter = express.Router();

editRouter.get("/", async (req, res) => {
	try {
		return res.render("user/profile/edit", {
            title: "Edit user profile",
            tagline: "Update your profile",
            bar: true,
			...expandData(req),
        });
	} catch(err) {
		console.error(err);
        return res.redirect('500');
	}
});

editRouter.post(
	"/",
	uploadImage,
	// Name
	body("name", "Name is required").escape().notEmpty(),
	body("name", "Name is too long").isLength({ max: DEFAULT_MAX_LENGTH }),
	// Email
	body("email", "Email is required").escape().notEmpty(),
	body("email", "That is not an email").isEmail(),
	body("email", "Email is too long").isLength({ max: DEFAULT_MAX_LENGTH }),
	// // Password
	// body("password", "Password is required").notEmpty(),
	// body("password", "Password is not strong enough, try adding more and different characters").isStrongPassword(),
	async (req, res) => {
		try {
			console.log(`[POST] /user/profile/edit`);
			
			// Validate the data
			const messages = validateResult(req);
			if(messages) {
				return res.render("job/create", {
					title: "Edit user profile",
					tagline: "Update your profile",
					bar: true,
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
			
			return res.redirect("/user/admin");
		} catch(err) {
			console.error(err);
			return res.redirect("500");
		}
	}
);

module.exports = editRouter;
