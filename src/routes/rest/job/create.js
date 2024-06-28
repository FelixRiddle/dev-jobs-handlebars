const express = require("express");
const { body } = require("express-validator");

const Job = require("../../../model/Job");
const validateResult = require("../../../lib/validation/validateResult");
const { DEFAULT_MAX_LENGTH } = require("../../job/create");

const createRouter = express.Router();

createRouter.post(
	"/",
	// Title
	body("title", "Title is required").escape().notEmpty(),
	body("title", "Title is too long").isLength({ max: DEFAULT_MAX_LENGTH }),
	// Company
	body("company", "Company is required").escape().notEmpty(),
	body("company", "Company is too long").isLength({ max: DEFAULT_MAX_LENGTH }),
	// Location
    body("location", "Location is required").escape().notEmpty(),
	body("location", "Location is too long").isLength({ max: DEFAULT_MAX_LENGTH }),
	// Salary
    body("salary", "Salary is required").escape().notEmpty(),
	body("salary", "Salary is invalid").isNumeric(),
	// Contract
	body("contract", "Contract is required").escape().notEmpty(),
	body("contract", "Contract is too long").isLength({ max: DEFAULT_MAX_LENGTH }),
	// Description
    body("description", "Description is required").escape().notEmpty(),
	body("description", "Description is too long").isLength({ max: 8192 }),
	// Skills
	// We have to escape each skill.
	// TODO: Or something else could be, to store ids that represent skills and add those here in the backend.
    body("skills", "Skills are required").escape().notEmpty(),
	async (req, res) => {
		try {
			console.log(`[POST] /rest/job/create`);
			
			// Validate the data
			const messages = validateResult();
			if(messages) {
				return res.render("job/create", {
                    title: "Create a job",
                    tagline: "Fill the formulary and create a new job",
                    closeSession: true,
                    name: req.user.name,
                    messages,
                    ...req.body,
                });
			}
			
			// Create model
			const job = new Job(req.body);
			
			// Update some data
			job.author = req.user._id;
			// Manually split the skills by commas
			job.skills = req.body.skills.split(",");
			
			// Save model
			await job.save();
			
			return res.send({
				messages: [{
					message: "Job post created",
					error: false,
				}],
				jobCreated: true,
			});
		} catch(err) {
			console.error(err);
			return res.status(500).send({
				messages: [{
					message: "Couldn't create the job, unkown error",
					error: true,
				}],
				jobCreated: false,
			});
		}
	}
);

module.exports = createRouter;
