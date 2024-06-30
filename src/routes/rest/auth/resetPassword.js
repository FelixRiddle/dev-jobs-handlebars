const express = require('express');
const { v4: uuidv4 } = require("uuid");

const sendMail = require("../../../lib/helpers/email")
const User = require('../../../model/User');
const expandData = require('../../../lib/misc/expand');
const { internalErrorMessage } = require('../../../lib/messages');

const resetPasswordRouter = express.Router();

resetPasswordRouter.post("/", async (req, res) => {
	try {
		console.log(`[${req.method}] `);
		
		const user = await User.findOne({
			email: req.body.email,
		});
		
		if(!user) {
			req.flash('messages', [{
				message: "No user found with that email",
                error: true,
			}]);
			return res.status(400).send({
				...expandData(req),
			});
		}
		
		user.token = uuidv4();
		user.expires = Date.now() + 3_600_000;
		
		await user.save();
		
		// Reset password magic link
		const magicLink = `http://${req.headers.host}/reset-password/token/${user.token}`;
		
		// Send mail
		await sendMail({
			email: user.email,
			subject: "Reset password",
			file: "reset",
			message: "Click the link to reset the password",
			context: {
				magicLink,
			}
		});
		
		req.flash('messages', [{
			message: "We've sent you an E-Mail with instructions",
			error: false,
		}]);
		
		return res.send({
			...expandData(req),
		});
	} catch(err) {
		console.error(err);
		req.flash('messages', [internalErrorMessage]);
		
		return res.status(500).send({
            ...expandData(req),
        });
	}
});

module.exports = resetPasswordRouter;

