const express = require("express");

const homeRouter = express.Router();

homeRouter.get("/", (req, res) => {
    return res.render('home', {
        title: "Homepage",
        tagline: "Find and post developer jobs",
        bar: true,
        button: true,
    });
});

module.exports = homeRouter;

