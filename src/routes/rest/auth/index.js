const express = require("express");
const loginRouter = require("./login");
const resetPasswordRouter = require("./resetPassword");
const createPassword = require("../../auth/createPassword");

const authRouter = express.Router();

authRouter.use("/create-password", createPassword);
authRouter.use("/login", loginRouter);
authRouter.use("/reset-password", resetPasswordRouter)

module.exports = authRouter;
