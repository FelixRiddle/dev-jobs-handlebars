const express = require("express");
const { authenticateUser } = require("../../lib/controller/authenticateUser");

const loginRouter = express.Router();

loginRouter.get("/", function(req, res) {
	try {
		return res.render("auth/login", {
			title: "Log in to devJobs",
			tagline: "Login",
		});
	} catch(err) {
		console.error(err);
        return res.redirect("500");
	}
});

loginRouter.post("/", authenticateUser);

// loginRouter.post("/", function(req, res) {
// 	try {
		
// 		return res.send({
// 			messages: [{
//                 message: "Logged in",
//                 error: false,
//             }],
// 		});
// 	} catch(err) {
// 		console.error(err);
//         return res.status(500).send({
// 			messages: [{
//                 message: "Internal error",
//                 error: true,
//             }],
// 		});
// 	}
// });

module.exports = loginRouter;
