const express = require("express");

const logoutRouter = express.Router();

logoutRouter.get("/logout", (req, res) => {
	try {
		return res
			.clearCookie('token')
			.send({
            messages: [{
                error: false,
                message: "User logged out",
            }],
		});
	} catch(err) {
		console.error(err);
		
		return res.status(500).send({
            message: "Internal error",
            error: true
        });
	}
});

module.exports = logoutRouter;
