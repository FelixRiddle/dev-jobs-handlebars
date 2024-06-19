const express = require("express");

const homeRouter = express.Router();

homeRouter.get("/", (req, res) => {
    return res.render('home', {
        title: "Homepage",
        tagline: "Find and post jobs for development",
        bar: true,
        button: true,
    });
});

module.exports = homeRouter;

