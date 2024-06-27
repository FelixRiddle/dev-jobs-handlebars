const express = require("express");
const profileRouter = require("../../user/profile");

const userRouter = express.Router();

userRouter.use("/profile", profileRouter);

module.exports = userRouter;

