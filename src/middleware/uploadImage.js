const multer = require("multer");
const { MulterError } = require("multer");
const shortid = require("shortid");

const upload = multer({
	limits: {
		fileSize: 1024 * 1024, // 1MB limit
	},
	storage: multer.diskStorage({
		destination: function(req, file, cb) {
            cb(null, `${process.cwd()}/public/uploads/profile`);
        },
        filename: function(req, file, cb) {
			const ext = file.originalname.split('.').pop();
			const filename = `${shortid.generate()}.${ext}`;
			
			cb(null, filename);
        }
	}),
	// Only allow images
	fileFilter: function(req, file, cb) {
		if(file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new MulterError({
                code: "LIMIT_FILE_TYPE",
                message: "Only images are allowed."
            }));
        }
	}
}).single("pfp");

/**
 * Upload image
 */
function uploadImage(req, res, next) {
	upload(req, res, function(err) {
		if(err) {
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
				
			return res.redirect("/user/admin");
		} else {
			return next();
		}
	});
}

module.exports = uploadImage;
