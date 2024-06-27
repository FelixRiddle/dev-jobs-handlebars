const express = require("express");
const { Types: MongooseTypes } = require("mongoose");

const Job = require('../../../../model/Job');

const ObjectId = MongooseTypes.ObjectId;

const getRouter = express.Router();

getRouter.get("/:id", async(req, res) => {
	try {
		const { id } = req.params;
		
		console.log(`[GET] /rest/job/get/${id}`);
		
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

getRouter.get("/url/:url", async(req, res) => {
	try {
		const { url } = req.params;
		
		console.log(`[GET] /rest/job/get/url/${url}`);
		
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

module.exports = getRouter;
