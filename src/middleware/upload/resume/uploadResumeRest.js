const multerShowUserError = require("../../../lib/multer/multerShowUserError");
const multerUploadPDFDriver = require("../../../lib/multer/multerUploadPDF");

/**
 * Upload resume
 */
function uploadResumeRest(req, res, next) {
    multerUploadPDFDriver(req, res, function(err) {
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

module.exports = uploadResumeRest;
