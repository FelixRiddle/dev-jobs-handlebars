const express = require("express");
const Job = require('../../model/Job');

const editRouter = express.Router();

editRouter.get("/:url", async(req, res, next) => {
	try {
		const job = await Job.findOne({
			url: req.params.url
		}).lean();
		
		if(!job) {
			return next();
		}
		
		const responseObject = {
			title: job.title,
			tagline: job.company,
			bar: true,
			job,
		};
		
		return res.render("job/edit", responseObject);
	} catch(err) {
		console.error(err);
		return res.status(500).send({
			messages: [{
                message: "Internal error",
                error: true,
            }],
		});
	}
});

editRouter.post("/:url", async(req, res, next) => {
	try {
		const updatedJob = req.body;
		
		updatedJob.skills = req.body.skills.split(",");
		
		await Job.findOneAndUpdate({
            url: req.params.url
        }, updatedJob, {
            new: true,
			runValidators: true,
        }).lean();
		
		return res.send({
			messages: [{
                message: "Job updated",
                error: false,
            }],
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
});

module.exports = editRouter;
