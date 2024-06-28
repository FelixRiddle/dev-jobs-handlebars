const express = require('express');
const validateJobPostingOwnership = require('../../../middleware/validateJobOwnership');

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
			
			const job = req.job;
			await job.remove();
			
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
