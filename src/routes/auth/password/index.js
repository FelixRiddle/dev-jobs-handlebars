const express = require("express");
const changePasswordRouter = require("./changePassword");

const passwordRouter = express.Router();

passwordRouter.use("/change-password", changePasswordRouter);

module.exports = passwordRouter;
