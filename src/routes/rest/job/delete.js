const express = require('express');
const validateJobPostingOwnership = require('../../../middleware/validateJobOwnership');
const Job = require('../../../model/Job');

const deleteRouter = express.Router();

/**
 * Delete job endpoint
 */
deleteRouter.delete(
	"/:id",
	validateJobPostingOwnership,
	async (req, res) => {
		try {
			console.log(`[DELETE] /rest/job/delete/${req.params.id}`);
			
			await Job.findByIdAndDelete(req.params.id);
			
			return res.send({
				messages: [{
					message: "Job deleted",
					error: false,
				}]
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
	}
);

module.exports = deleteRouter;
