const express = require('express');

const internalErrorRouter = express.Router();

internalErrorRouter.get("/", function(req, res) {
	return res.render("500", {
		user: req.user
	});
});

module.exports = internalErrorRouter;
