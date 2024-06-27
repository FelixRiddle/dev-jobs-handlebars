const express = require("express");
const Job = require("../../../model/Job");

const createRouter = express.Router();

createRouter.post("/", async (req, res) => {
    try {
		const job = new Job(req.body);
		
		job.skills = req.body.skills.split(",");
		
		const newJob = await job.save();
		
		return res.send({
			messages: [{
                message: "Job post created",
                error: false,
            }],
            jobCreated: true,
		});
	} catch(err) {
		console.error(err);
		return res.status(500).send({
			messages: [{
                message: "Couldn't create the job, unkown error",
                error: true,
            }],
            jobCreated: false,
		});
	}
});

module.exports = createRouter;
