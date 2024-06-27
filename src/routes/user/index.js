const express = require("express");
const adminRouter = require("./admin");
const profileRouter = require("./profile");

const userRouter = express.Router();

userRouter.use("/profile", profileRouter);
userRouter.use("/admin", adminRouter);

module.exports = userRouter;
