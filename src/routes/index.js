const express = require("express");

const homeRouter = require("./home");
const jobRouter = require("./job");
const authRouter = require("./auth");
const userRouter = require("./user");
const { validateUserFrontend } = require("../middleware/validateUser");
const restRouter = require("./rest");
const internalErrorRouter = require("./500");
const expandData = require("../lib/misc/expand");
const createHttpError = require("http-errors");
const searchRouter = require("./search");

const router = express.Router();

router.use(homeRouter);
router.use("/auth", authRouter);
router.use('/job', jobRouter);
router.use("/rest", restRouter);
router.use("/search", searchRouter);
// Any user route requires authentication
router.use("/user", validateUserFrontend, userRouter);

// Status pages
router.use("/500", internalErrorRouter);

// If a route is not found, render 404
router.use((req, res) => {
	console.log(`[${req.method}] ${req.path}`);
	console.log(`Status 404: Not found`);
	
	return res.status(404).render("404", {
        title: "Page not found",
        tagline: "The requested page was not found",
		...expandData(req),
    });
});

// router.use((req, res, next) => {
// 	return next(createHttpError(404, "Not found"));
// });

// router.use((error, req, res) => {
// 	res.locals.message = error.message;
	
// 	const status = error.status || 500;
// 	res.locals.status = status;
	
// 	return res.status(status).render("error");
// });

module.exports = router;
