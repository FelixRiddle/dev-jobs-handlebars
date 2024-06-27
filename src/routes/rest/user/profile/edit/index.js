const express = require("express");
const User = require("../../../../../model/User");

const editRouter = express.Router();

editRouter.post("/", async (req, res) => {
	try {
        const user = await User.findById(req.user._id);
		
        user.name = req.body.name;
		user.email = req.body.email;
		
		if(req.body.password) {
			user.password = req.body.password;
		}
		
		await user.save();
		
        return res.send({
			messages: [{
				message: "Updated",
				error: false,
			}]
		});
    } catch(err) {
        console.error(err);
        return res
			.status(500)
			.send({
				messages: [{
                    message: "Internal error",
                    error: true,
                }]
			});
    }
});


module.exports = editRouter;
