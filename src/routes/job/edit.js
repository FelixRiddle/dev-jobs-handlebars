const express = require("express");
const Job = require('../../model/Job');
const { Types: MongooseTypes } = require("mongoose");

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
		return res.status(500).send({
			messages: [{
                message: "Internal error",
                error: true,
            }],
		});
	}
});

editRouter.post("/:url", async(req, res, next) => {
	try {
		
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

module.exports = editRouter;
