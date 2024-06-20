const express = require("express");

const createRouter = express.Router();

createRouter.get("/create", (req, res) => {
    return res.render("job/create", {
        title: "Create a job",
        tagline: "Fill the formulary and create a new job",
    });
});

createRouter.post("/create", (req, res) => {
    
});

module.exports = createRouter;
