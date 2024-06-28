const express = require("express");
const Job = require('../../model/Job');
const expandData = require("../../lib/misc/expand");

const editRouter = express.Router();

editRouter.get("/:url", async(req, res, next) => {
	try {
		const job = await Job.findOne({
			url: req.params.url
		}).lean();
		
		if(!job) {
			return next();
		}
		
		return res.render("job/edit", {
			title: job.title,
			tagline: job.company,
			bar: true,
			closeSession: true,
			job,
			...expandData(req),
		});
	} catch(err) {
		console.error(err);
		return res.redirect("500");
	}
});

module.exports = editRouter;
