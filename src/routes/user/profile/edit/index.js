const express = require("express");
const User = require("../../../../model/User");

const editRouter = express.Router();

editRouter.get("/", async (req, res) => {
	try {
		const user = await User.findById(req.user._id).lean();
		
		return res.render("user/profile/edit", {
            title: "Edit user profile",
            tagline: "Update your profile",
            bar: true,
			user
        });
	} catch(err) {
		console.error(err);
        return res.redirect('500');
	}
});

module.exports = editRouter;
