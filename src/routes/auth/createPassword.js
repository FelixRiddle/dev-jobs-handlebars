const express = require("express");

const User = require("../../model/User");
const expandData = require("../../lib/misc/expand");

const createPassword = express.Router();

createPassword.get("/:token", async (req, res) => {
	try {
		const token = req.params.token;
		console.log(`[GET] /auth/reset-password/token/${token}`);
		
		const user = await User.findOne({
			token,
			expires: {
				$gt: Date.now(),
			}
		});
		
		if(!user) {
			req.flash("messages", [{
				message: "Error, either the token is incorrect or it has expired",
				error: true,
			}]);
			
			return res.redirect("/auth/reset-password");
		}
		
		return res.render("/auth/create-password", {
			title: "Reset password",
			tagline: "Create and confirm your new password",
			...expandData(req),
		});
	} catch(err) {
		console.error(err);
		return res.redirect("/404");
	}
});

module.exports = createPassword;
