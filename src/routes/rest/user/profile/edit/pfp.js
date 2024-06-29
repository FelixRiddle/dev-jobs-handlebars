const express = require("express");

const User = require("../../../../../model/User");
const uploadImageRest = require("../../../../../middleware/upload/uploadImageRest");

const profilePictureRouter = express.Router();

/**
 * Upload profile picture
 * 
 * This endpoint is used to upload a profile picture from nextjs
 * 
 * Because I'm unable to create an object with file data and send it to a server action.
 * 
 * This brings me to this warning:
 * 
 * WARNING: Uploading a file is optional.
 */
profilePictureRouter.post(
	"/",
	uploadImageRest,
	async function (req, res) {
		try {
			console.log(`[POST] /rest/user/profile/edit/pfp`);
			
			console.log(`Image given: `, req.file);
			
			if(!req.file) {
				console.warn("No image given");
				return res
					// 202 Accepted: The request has been received but not acted upon.
					.status(202)
					.send({
						messages: [{
							message: "Nothing changed",
							error: false,
						}]
					});
			}
			
			const user = await User.findById(req.user._id);
			user.image = req.file.filename;
			
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
	}
);

module.exports = profilePictureRouter;
