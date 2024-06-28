const express = require("express");

const User = require("../../../../model/User");
const expandData = require("../../../../lib/misc/expand");

const editRouter = express.Router();

editRouter.get("/", async (req, res) => {
	try {
		return res.render("user/profile/edit", {
            title: "Edit user profile",
            tagline: "Update your profile",
            bar: true,
			closeSession: true,
			...expandData(req),
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
