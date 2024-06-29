const { MulterError } = require("multer");

/**
 * Show user error
 * 
 * Local function to not repeat code twice
 */
function multerShowUserError(err, req) {
	if(err instanceof MulterError) {
		if(err.code === "LIMIT_FILE_SIZE") {
			const message = "File size is too large. Please upload a file smaller than 1MB.";
			
			req.flash('messages', [{
				message,
				error: true,
			}]);
		} else {
			req.flash("messages", [{
				message: err.message,
				error: true,
			}]);
		}
	} else {
		req.flash("messages", [{
			message: err.message,
			error: true,
		}]);
	}
}

module.exports = multerShowUserError
