const express = require("express");
const Job = require("../model/Job");
const expandData = require("../lib/misc/expand");

const homeRouter = express.Router();

homeRouter.get("/", async (req, res, next) => {
	const jobs = await Job.find().lean();
	
	if(!jobs) {
		return next();
	}
	
    return res.render('home', {
        title: "Homepage",
        tagline: "Find and post developer jobs",
        bar: true,
        button: true,
		jobs,
		...expandData(req),
    });
});

module.exports = homeRouter;
