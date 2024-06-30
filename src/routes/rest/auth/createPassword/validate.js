const express = require("express");

const User = require("../../../../model/User");
const expandData = require("../../../lib/mix/expand");
const { internalErrorMessage } = require("../../../../lib/messages");

const validateTokenRouter = express.Router();

validateTokenRouter.post("/:token", async (req, res) => {
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
			
			return res.status(400).send({
				...expandData,
			});
		}
		
		return res.send({
			messages: [{
				message: "Token ok",
				error: false
			}],
			tokenOk: true,
		});
	} catch(err) {
		console.error(err);
		return res.status(500).send({
			messages: [internalErrorMessage]
		});
	}
});

module.exports = validateTokenRouter;
