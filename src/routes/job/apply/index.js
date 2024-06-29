const express = require("express");
const uploadResumeFrontend = require("../../../middleware/upload/resume/uploadResumeFrontend");

const applyRouter = express.Router();

applyRouter.post(
	"/",
	uploadResumeFrontend,
	async (req, res) => {
		try {
			console.log(`[POST] /job/apply`);
			
			return res.redirect("/");
		} catch(err) {
			console.error(err);
			return res.redirect("/500");
		}
}
);

module.exports = applyRouter;
