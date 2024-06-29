const multerShowUserError = require("../../../lib/multer/multerShowUserError");
const multerUploadPDFDriver = require("../../../lib/multer/multerUploadPDF");

/**
 * Upload resume
 */
function uploadResumeFrontend(req, res, next) {
    multerUploadPDFDriver(req, res, function(err) {
        if(err) {
            multerShowUserError(err, req);
            
			return res.redirect("back");
        }
		
		return next();
    });
}

module.exports = uploadResumeFrontend;
