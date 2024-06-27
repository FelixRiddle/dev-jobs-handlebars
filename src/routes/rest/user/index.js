const express = require("express");
const profileRouter = require("./profile");

const userRouter = express.Router();

userRouter.use("/profile", profileRouter);

userRouter.get("/", async (req, res) => {
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

module.exports = userRouter;
