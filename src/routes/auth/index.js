const express = require("express");
const createAccount = require("./createAccount");
const loginRouter = require("./login");

const authRouter = express.Router();

// Auth will have to be unified with express authentication.
authRouter.use("/create-account", createAccount);
authRouter.use("/login", loginRouter);

module.exports = authRouter;

