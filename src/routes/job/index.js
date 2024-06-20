const express = require("express");

const createRouter = require("./create");

const jobRouter = express.Router();

jobRouter.use(createRouter);

module.exports = jobRouter;
