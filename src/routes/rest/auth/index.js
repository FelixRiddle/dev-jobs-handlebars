const express = require("express");
const loginRouter = require("./login");

const authRouter = express.Router();

authRouter.use("/login", loginRouter);

module.exports = authRouter;
