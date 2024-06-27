const express = require("express");

const editRouter = require("./edit");
const User = require("../../../../model/User");

const profileRouter = express.Router();

profileRouter.use("/edit", editRouter);

editRouter.get("/", async (req, res) => {
	try {
		console.log(`[GET] /rest/user/profile`)
		// const user = await User.findById(req.user._id).lean();
		// We've got the user already
		const user = req.user;
		console.log(`User: `, user);
		
		return res.send({
			messages: [],
			user
        });
	} catch(err) {
		console.error(err);
        return res.status(500).send({
			messages: [{
				message: "Internal error",
                error: true
			}]
		});
	}
});

module.exports = profileRouter;
