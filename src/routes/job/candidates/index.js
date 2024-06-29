const express = require("express");
const Job = require("../../../model/Job");
const expandData = require("../../../lib/misc/expand");

const candidatesRoute = express.Router();

candidatesRoute.get('/:id', async (req, res, next) => {
	try {
		const id = req.params.id;
		console.log(`[GET] /job/candidates/${id}`);
		const job = await Job.findById(id);
		
		// Check if the job exists
		if(!job) {
			console.log(`The job doesn't exists`);
			return next();
		}
		
		// Get job author and user and check ownership
		const jobAuthorId = job.author;
		const userId = req.user.id;
		const userIsAuthor = jobAuthorId.equals(userId);
		if(!userIsAuthor) {
			console.log(`The user is not authorized`);
			return next();
		}
		
		return res.render("job/candidates/index", {
			title: `Candidates - ${job.title}`,
			bar: true,
			job: JSON.parse(JSON.stringify(job)),
			...expandData(req),
		});
	} catch(err) {
		console.error(err);
        return res.redirect('/500');
	}
});

module.exports = candidatesRoute;
