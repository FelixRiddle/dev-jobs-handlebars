const express = require("express");
const createAccount = require("./createAccount");
const loginRouter = require("./login");
const resetPasswordRouter = require("./resetPassword");
const createPassword = require("./createPassword");

const authRouter = express.Router();

// Auth will have to be unified with express authentication.
authRouter.use("/create-password", createPassword);
authRouter.use("/reset-password", resetPasswordRouter);
authRouter.use("/create-account", createAccount);
authRouter.use("/login", loginRouter);

module.exports = authRouter;

