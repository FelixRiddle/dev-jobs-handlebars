const expandData = require("../../lib/misc/expand");
const multerShowUserError = require("../../lib/multer/multerShowUserError");
const multerUploadDriver = require("../../lib/multer/multerUploadDriver");

/**
 * Upload image but for the rest api
 */
function uploadImageRest(req, res, next) {
	multerUploadDriver(req, res, function(err) {
		if(err) {
			multerShowUserError();
				
			return res.send({
				...expandData(req),
			});
		} else {
			return next();
		}
	});
}

module.exports = uploadImageRest;
