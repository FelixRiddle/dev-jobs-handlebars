const express = require("express");
const Job = require("../../model/Job");

const createRouter = express.Router();

createRouter.get("/create", (req, res) => {
    return res.render("job/create", {
        title: "Create a job",
        tagline: "Fill the formulary and create a new job",
    });
});

createRouter.post("/create", async (req, res) => {
    try {
		const job = new Job(req.body);
		
		job.skills = req.body.skills.split(",");
		
		const newJob = await job.save();
		
		return res.redirect(`/job/${job.url}`);
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
