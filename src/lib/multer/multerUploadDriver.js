const multer = require("multer");
const shortid = require("shortid");

const filePath = `${process.cwd()}/public/uploads/profile`;
const multerUploadDriver = multer({
	limits: {
		fileSize: 1024 * 1024, // 1MB limit
	},
	storage: multer.diskStorage({
		destination: function(req, file, cb) {
            return cb(null, filePath);
        },
        filename: function(req, file, cb) {
			const ext = file.originalname.split('.').pop();
			const filename = `${shortid.generate()}.${ext}`;
			
			return cb(null, filename);
        }
	}),
	// Only allow images
	fileFilter: function(req, file, cb) {
		const isImage = file.mimetype.startsWith("image/");
		
		if(isImage) {
            return cb(null, true);
        } else {
            return cb(new multer.MulterError({
                code: "LIMIT_FILE_TYPE",
                message: "Only images are allowed."
            }));
        }
	}
}).single("pfp");

module.exports = multerUploadDriver;
