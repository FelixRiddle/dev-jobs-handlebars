const multerShowUserError = require("../../lib/multer/multerShowUserError");
const multerUploadDriver = require("../../lib/multer/multerUploadDriver");

/**
 * Upload image
 */
function uploadImageFrontend(req, res, next) {
	multerUploadDriver(req, res, function(err) {
		if(err) {
			multerShowUserError(err, req);
			
			return res.redirect("/user/admin");
		} else {
			return next();
		}
	});
}

module.exports = uploadImageFrontend;
