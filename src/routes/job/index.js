const express = require("express");
const Job = require('../../model/Job');
const { Types: MongooseTypes } = require("mongoose");

const createRouter = require("./create");

const ObjectId = MongooseTypes.ObjectId;

const jobRouter = express.Router();

jobRouter.use("/create", createRouter);

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

jobRouter.get("/get/:id", async(req, res) => {
	try {
		const { id } = req.params;
		
		console.log(`[GET] /job/get/${id}`);
		
		const objectId = new ObjectId(id);
		
		const job = await Job
			.findById(objectId)
			.lean();
		
		return res.send({
			job,
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

jobRouter.get("/get/url/:url", async(req, res) => {
	try {
		const { url } = req.params;
		
		console.log(`[GET] /job/get/url/${url}`);
		
		const job = await Job.findOne({
			url
		}).lean();
		
		return res.send({
			job
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
