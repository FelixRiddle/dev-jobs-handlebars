const express = require("express");

const Job = require('../../model/Job');
const createRouter = require("./create");
const editRouter = require("./edit");
const getUrl = require("../../lib/config/url");
const { validateUserFrontend } = require("../../middleware/validateUser");

const jobRouter = express.Router();

jobRouter.use("/create", validateUserFrontend, createRouter);
jobRouter.use("/edit", validateUserFrontend, editRouter);

/**
 * This is the same as the previous endpooint
 * 
 * The problem is taht I can't use redirection with post requests because I'm making these to also be
 * a REST API.
 * 
 * So this one uses redirect and should only be called with handlebars frontend.
 */
jobRouter.post("/edit_alt/redirect/:url", validateUserFrontend, async(req, res, next) => {
	const url = getUrl();
	try {
		const paramsUrl = req.params.url;
		const updatedJob = req.body;
		
		console.log(`[POST] /job/edit_alt/redirect/${paramsUrl}`);
		
		updatedJob.skills = req.body.skills.split(",");
		
		await Job.findOneAndUpdate({
            url: paramsUrl
        }, updatedJob, {
            new: true,
			runValidators: true,
        }).lean();
		
		const newUrl = `${url}`;
		console.log(`Redirect to: `, newUrl);
		
		return res.redirect(newUrl);
	} catch(err) {
		console.error(err);
		return res.redirect(`${url}/500`);
	}
});

// --- Renders ---
/**
 * FIXME: This is wrong, if a job has the same name as an endpoint, it will be re-routered to the endpoint.
 * 
 * Use something like /show/:url or /view
 */
jobRouter.get("/:url", async (req, res) => {
	try {
		console.log(`[GET] /job/${req.params.url}`);
		const job = await Job.findOne({
			url: req.params.url
		}).lean();
		
		console.log(`Job: `, job);
		
		if(!job) {
			return res.status(404).redirect("/404");
		}
		
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
		return res.send("500");
	}
});

module.exports = jobRouter;
