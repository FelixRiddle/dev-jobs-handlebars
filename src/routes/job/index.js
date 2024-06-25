const express = require("express");

const Job = require('../../model/Job');
const createRouter = require("./create");
const getRouter = require("./get");
const editRouter = require("./edit");

const jobRouter = express.Router();

jobRouter.use("/create", createRouter);
jobRouter.use("/edit", editRouter);
jobRouter.use("/get", getRouter);

jobRouter.get("/get_all", async (req, res) => {
	try {
		const jobs = await Job.find();
		
		return res.send({
            jobs,
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

// --- Renders ---
jobRouter.get("/:url", async (req, res) => {
	try {
		const job = await Job.findOne({
			url: req.params.url
		}).lean();
		
		console.log(`Job: `, job);
		
		// Debugging 101
		// The problem was mongoose, the '.lean' fixed it.
		const responseObject = {
			job,
			title: job.title,
			tagline: job.company,
			bar: true,
		};
		
		return res.render("job/job", responseObject);
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

module.exports = jobRouter;
