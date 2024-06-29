const { MulterError } = require("multer");

/**
 * Show user error
 * 
 * Local function to not repeat code twice
 */
function multerShowUserError(req, next) {
	if(err instanceof MulterError) {
		if(err.code === "LIMIT_FILE_SIZE") {
			req.flash('messages', [{
				message: "File size is too large. Please upload a file smaller than 1MB.",
				error: true,
			}]);
		} else {
			req.flash("messages", [{
				message: err.message,
				error: true,
			}]);
		}
		
		return next();
	} else {
		req.flash("messages", [{
			message: err.message,
			error: true,
		}]);
	}
}

module.exports = multerShowUserError
