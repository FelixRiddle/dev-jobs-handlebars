const express = require("express");
const uploadResumeFrontend = require("../../../middleware/upload/resume/uploadResumeFrontend");
const Job = require("../../../model/Job");

const applyRouter = express.Router();

applyRouter.post(
	"/:url",
	uploadResumeFrontend,
	async (req, res) => {
		try {
			console.log(`[POST] /job/apply/${req.params.url}`);
			
			const job = await Job.findOne({
				url: req.params.url
			});
			
			if(!job) {
				return next();
			}
			
			if(!req.file) {
				console.log(`Error: The user didn't upload a file`);
				return next();
			}
			
			const newCandidate = {
				name: req.body.name,
				email: req.body.email,
				resume: req.file.filename,
			};
			
			job.candidates.push(newCandidate);
			
			await job.save();
			
			req.flash('messages', [{
				message: "Application submitted",
                error: false,
			}]);
			
			return res.redirect("/");
		} catch(err) {
			console.error(err);
			return res.redirect("/500");
		}
}
);

module.exports = applyRouter;
