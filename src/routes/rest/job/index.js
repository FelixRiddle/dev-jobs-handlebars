const express = require('express');
const getRouter = require('./get');
const createRouter = require('./create');
const Job = require("../../../model/Job");
const editRouter = require('./edit');
const { validateUser } = require('../../../middleware/validateUser');
const deleteRouter = require('./delete');
const applyRouter = require('./apply');
const candidatesRoute = require('./candidates');

const jobRouter = express.Router();

jobRouter.use("/candidates", validateUser, candidatesRoute);
jobRouter.use("/apply", validateUser, applyRouter);
jobRouter.use("/delete", validateUser, deleteRouter);
jobRouter.use("/edit", validateUser, editRouter);
jobRouter.use("/create", validateUser, createRouter);
jobRouter.use("/get", getRouter);

jobRouter.get("/get_all", async (req, res) => {
	try {
		const jobs = await Job.find();
		
		return res.send({
            jobs,
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

module.exports = jobRouter;
