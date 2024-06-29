const express = require("express");
const uploadResumeRest = require("../../../../middleware/upload/resume/uploadResumeRest");

const applyRouter = express.Router();

applyRouter.post(
	"/",
	uploadResumeRest,
	async (req, res) => {
		try {
			
			
			return res.send({
				messages: [{
					error: false,
					message: "Application submitted successfully",
				}]
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
);

module.exports = applyRouter;
