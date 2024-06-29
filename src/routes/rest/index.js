const express = require("express");
const userRouter = require("./user");
const { validateUser } = require("../../middleware/validateUser");
const jobRouter = require("./job");
const authRouter = require("./auth");

const restRouter = express.Router();

restRouter.use("/auth", authRouter);
restRouter.use('/job', jobRouter);
restRouter.use("/user", validateUser, userRouter);

// Custom REST API 404 message
restRouter.use((req, res) => {
    return res.status(404).json({
		messages: [{
			error: true,
			message: "The requested endpoint does not exist."
		}]
    });
});

module.exports = restRouter;
