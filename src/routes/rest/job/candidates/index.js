const express = require("express");
const Job = require("../../../model/Job");
const expandData = require("../../../lib/misc/expand");

const candidatesRoute = express.Router();

/**
 * It's the same as getting the job by url, but this time with ID
 */
candidatesRoute.get('/:id', async (req, res, next) => {
	try {
		const id = req.params.id;
		
		console.log(`[GET] /rest/job/candidates/${id}`);
		
		const job = await Job.findById(id);
		
		if(!job) {
			return next();
		}
		
		if(job.author.equals(req.user.id)) {
			return next();
		}
		
		return res.send({
			job
		});
	} catch(err) {
		console.error(err);
		return res.status(500).send({
			messages: [{
                message: "Internal error",
                error: true,
            }]
		});
	}
});

module.exports = candidatesRoute;
