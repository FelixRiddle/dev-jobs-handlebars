const express = require("express");

const editRouter = express.Router();

editRouter.post("/:url", async(req, res, next) => {
	try {
		const updatedJob = req.body;
		
		updatedJob.skills = req.body.skills.split(",");
		
		await Job.findOneAndUpdate({
            url: req.params.url
        }, updatedJob, {
            new: true,
			runValidators: true,
        }).lean();
		
		return res.send({
			messages: [{
                message: "Job updated",
                error: false,
            }],
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

module.exports = editRouter;
