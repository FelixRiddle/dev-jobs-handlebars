const express = require('express');
const Job = require('../model/Job');
const expandData = require('../lib/misc/expand');

const searchRouter = express.Router();

searchRouter.post("/", async (req, res) => {
	try {
		const query = req.body.q;
		const jobs = await Job.find({
			$text: {
				$search: query
			}
		});
		
		return res.render('home', {
			title: "Homepage",
			tagline: "Jobs result",
			bar: true,
			button: true,
			jobs,
			...expandData(req),
		});
	} catch(err) {
		console.error(err);
		return res.render("500");
	}
});

module.exports = searchRouter;
