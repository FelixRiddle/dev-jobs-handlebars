const express = require("express");
const loginRouter = require("./login");
const resetPasswordRouter = require("./resetPassword");

const authRouter = express.Router();

authRouter.use("/login", loginRouter);
authRouter.use("/reset-password", resetPasswordRouter)

module.exports = authRouter;
