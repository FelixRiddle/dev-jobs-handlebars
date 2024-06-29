const express = require("express");
const uploadResumeRest = require("../../../../middleware/upload/resume/uploadResumeRest");
const Job = require("../../../../model/Job");

const applyRouter = express.Router();

applyRouter.post(
	"/:url",
	uploadResumeRest,
	async (req, res) => {
		try {
			console.log(`[POST] /rest/job/apply/${req.params.url}`);
			
			const job = await Job.findOne({
				url: req.params.url
			});
			
			if(!job) {
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
			
			return res.send({
				messages: [{
					error: false,
					message: "Application submitted",
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
