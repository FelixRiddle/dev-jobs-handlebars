const express = require("express");
const Job = require('../../model/Job');

const createRouter = require("./create");

const jobRouter = express.Router();

jobRouter.use(createRouter);

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

module.exports = jobRouter;
