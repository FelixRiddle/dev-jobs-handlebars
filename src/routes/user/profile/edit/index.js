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

editRouter.post("/", async (req, res) => {
	try {
        const user = await User.findById(req.user._id);
		
        user.name = req.body.name;
		user.email = req.body.email;
		
		if(req.body.password) {
			user.password = req.body.password;
		}
		
		await user.save();
		
        return res.redirect("/user/admin");
    } catch(err) {
        console.error(err);
        return res.redirect("500");
    }
});

module.exports = editRouter;
