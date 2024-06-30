const express = require('express');
const expandData = require('../../lib/misc/expand');

const resetPasswordRouter = express.Router();

resetPasswordRouter.get("/", (req, res) => {
	return res.render("auth/reset-password", {
		title: "Reset password",
		tagline: "Reset your password using a link sent to your email",
		...expandData(req),
	});
});

module.exports = resetPasswordRouter;

