const express = require("express");
const createAccount = require("./createAccount");

const authRouter = express.Router();

// Auth will have to be unified with express authentication.
authRouter.use("/create-account", createAccount);

module.exports = authRouter;

