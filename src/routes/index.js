const express = require("express");
const homeRouter = require("./home");
const jobRouter = require("./job");
const authRouter = require("./auth");
const userRouter = require("./user");

const router = express.Router();

router.use(homeRouter);
router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use('/job', jobRouter);
router.get("/", (req, res) => {
    return res.send("Hello World", {
        title: "Hello world!",
    });
});

module.exports = router;
