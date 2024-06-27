const express = require("express");
const userRouter = require("./user");
const { validateUser } = require("../../middleware/validateUser");
const jobRouter = require("./job");

const restRouter = express.Router();

restRouter.use('/job', jobRouter);
restRouter.use("/user", validateUser, userRouter);

module.exports = restRouter;
