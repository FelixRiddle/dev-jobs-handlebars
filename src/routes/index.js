const express = require("express");
const homeRouter = require("./home");

const router = express.Router();

router.use(homeRouter);
router.get("/", (req, res) => {
    return res.send("Hello World", {
        title: "Hello world!",
    });
});

module.exports = router;
