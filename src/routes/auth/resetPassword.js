const express = require('express');
const expandData = require('../../lib/misc/expand');
const User = require('../../model/User');
const crypto = require("crypto");
const sendMail = require('../../lib/helpers/email');

const resetPasswordRouter = express.Router();

const metadata = {
	title: "Reset password",
	tagline: "Reset your password using a link sent to your email",
};

resetPasswordRouter.get("/", (req, res) => {
	return res.render("auth/reset-password", {
		...metadata,
		...expandData(req),
	});
});

resetPasswordRouter.post("/", async (req, res) => {
	try {
		console.log(`[POST] /auth/reset-password`);
		
		const user = await User.findOne({
			email: req.body.email,
		});
		
		if(!user) {
			req.flash('messages', [{
				message: "No user found with that email",
                error: true,
			}]);
			return res.render("auth/reset-password", {
				...metadata,
				...expandData(req),
			});
		}
		
		user.token = crypto.randomBytes(20).toString("hex");
		user.expires = Date.now() + 3_600_000;
		
		await user.save();
		
		// Reset password magic link
		const magicLink = `http://${req.headers.host}/reset-password/token/${user.token}`;
		
		// Send mail
		await sendMail({
			email: user.email,
			subject: "Reset password",
			file: "reset",
			context: {
				magicLink,
			}
		});
		
		req.flash('messages', [{
			message: "We've sent you an E-Mail with instructions",
			error: false,
		}]);
		
		return res.redirect(
			'/auth/login'
		);
	} catch(err) {
		console.error(err);
		return res.redirect("/500");
	}
});

module.exports = resetPasswordRouter;

