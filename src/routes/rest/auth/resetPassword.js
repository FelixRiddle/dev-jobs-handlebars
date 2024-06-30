const express = require('express');
const crypto = require("crypto");
const User = require('../../../model/User');
const expandData = require('../../../lib/misc/expand');

const resetPasswordRouter = express.Router();

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
			return res.status(400).send({
				...expandData(req),
			});
		}
		
		user.token = crypto.randomBytes(20).toString("hex");
		user.expires = Date.now() + 3_600_000;
		
		await user.save();
		
		// TODO: 
		const magicLink = `http://${req.headers.host}/reset-password/token/${user.token}`;
		
		req.flash('messages', [{
			message: "We've sent you an E-Mail with instructions",
			error: false,
		}]);
		
		return res.send({
			...expandData(req),
		});
	} catch(err) {
		console.error(err);
		return res.status(500).send({
            ...expandData(req),
        });
	}
});

module.exports = resetPasswordRouter;

