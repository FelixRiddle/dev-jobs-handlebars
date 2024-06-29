const expandData = require("../../lib/misc/expand");
const multerShowUserError = require("../../lib/multer/multerShowUserError");
const multerUploadDriver = require("../../lib/multer/multerUploadDriver");

/**
 * Upload image but for the rest api
 */
function uploadImageRest(req, res, next) {
	multerUploadDriver(req, res, function(err) {
		if(err) {
			multerShowUserError(err, req);
			
			console.log(`Error`);
			console.error(err);
			
			return res.send({
				...expandData(req),
			});
		} else {
			return next();
		}
	});
}

module.exports = uploadImageRest;
