const multer = require("multer");
const shortid = require("shortid");

const multerUploadDriver = multer({
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
            cb(new multer.MulterError({
                code: "LIMIT_FILE_TYPE",
                message: "Only images are allowed."
            }));
        }
	}
}).single("pfp");

module.exports = multerUploadDriver;
