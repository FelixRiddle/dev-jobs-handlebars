const Job = require("../model/Job");

/**
 * Validate job posting ownership
 * 
 * Uses request parameters with 'id' field
 */
async function validateJobPostingOwnership(req, res, next) {
	try {
		// Find job
		const job = await Job.findById(req.params.id);
		if(!job) {
			return res.status(404).send({
				messages: [{
					message: "Job not found.",
					error: true,
				}]
			});
		}
		
		// Set on the request
		req.job = job;
		
		// Validate ownership
		if(!job.author.equals(req.user._id)) {
			return res.status(403).send({
				messages: [{
					message: "You don't have permission to perform this action.",
					error: true,
				}]
			});
		}
		
		next();
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

module.exports = validateJobPostingOwnership;
