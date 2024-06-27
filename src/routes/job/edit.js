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
		return res.redirect("500");
	}
});

module.exports = editRouter;
