const express = require('express');
const expandData = require('../lib/misc/expand');

const internalErrorRouter = express.Router();

internalErrorRouter.get("/", function(req, res) {
	return res.render("500", {
		...expandData(req),
	});
});

module.exports = internalErrorRouter;
