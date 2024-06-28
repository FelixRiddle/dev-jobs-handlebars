const express = require("express");
const Job = require("../../model/Job");
const expandData = require("../../lib/misc/expand");

const adminRouter = express.Router();

adminRouter.get("/", async function(req, res) {
	try {
		const jobs = await Job.find({
			author: req.user._id
		}).lean();
		
		// Debug
		// jobs.forEach((job) => {
		// 	job.stringified = JSON.stringify(job, undefined, 4);
		// });
		
		return res.render("user/admin", {
			title: "Administration panel",
			tagline: "Create and administrate your job positions from here",
			closeSession: true,
			...expandData(req),
			jobs,
		});
	} catch(err) {
		return res.redirect('500');
	}
});

module.exports = adminRouter;
