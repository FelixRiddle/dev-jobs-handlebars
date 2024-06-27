const express = require("express");
const userRouter = require("./user");
const { validateUser } = require("../../middleware/validateUser");
const jobRouter = require("./job");
const authRouter = require("./auth");

const restRouter = express.Router();

restRouter.use("/auth", authRouter);
restRouter.use('/job', jobRouter);
restRouter.use("/user", validateUser, userRouter);

module.exports = restRouter;
