const express = require("express");
const editRouter = require("./edit");

const profileRouter = express.Router();

profileRouter.use("/edit", editRouter);

module.exports = profileRouter;
