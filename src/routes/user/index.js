const express = require("express");
const adminRouter = require("./admin");
const profileRouter = require("./profile");
const logoutRouter = require("./logout");

const userRouter = express.Router();

userRouter.use('/logout', logoutRouter);
userRouter.use("/profile", profileRouter);
userRouter.use("/admin", adminRouter);

module.exports = userRouter;
