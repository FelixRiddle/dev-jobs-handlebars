const express = require("express");

const homeRouter = require("./home");
const jobRouter = require("./job");
const authRouter = require("./auth");
const userRouter = require("./user");
const { validateUserFrontend } = require("../middleware/validateUser");
const restRouter = require("./rest");
const internalErrorRouter = require("./500");
const expandData = require("../lib/misc/expand");

const router = express.Router();

router.use(homeRouter);
router.use("/rest", restRouter);
// Any user route requires authentication
router.use("/user", validateUserFrontend, userRouter);
router.use("/auth", authRouter);
router.use('/job', jobRouter);
router.get("/", (req, res) => {
    return res.send("Hello World", {
        title: "Hello world!",
    });
});

// Status pages
router.use("/500", internalErrorRouter);
// If a route is not found, render 404
router.use((req, res) => {
	return res.status(404).render("404", {
        title: "Page not found",
        tagline: "The requested page was not found",
		...expandData(req),
    });
});

module.exports = router;
