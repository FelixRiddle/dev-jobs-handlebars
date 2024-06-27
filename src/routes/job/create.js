const express = require("express");
const Job = require("../../model/Job");

const createRouter = express.Router();

createRouter.get("/", (req, res) => {
    return res.render("job/create", {
        title: "Create a job",
        tagline: "Fill the formulary and create a new job",
    });
});

createRouter.post("/", async (req, res) => {
    try {
		const job = new Job(req.body);
		
		job.skills = req.body.skills.split(",");
		
		const newJob = await job.save();
		
		return res.redirect(`/job/${job.url}`);
	} catch(err) {
		console.error(err);
		return res.redirect("/500");
	}
});

module.exports = createRouter;
