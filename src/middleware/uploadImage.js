const multer = require("multer");
const { MulterError } = require("multer");
const shortid = require("shortid");

const upload = multer({
	storage: multer.diskStorage({
		destination: function(req, file, cb) {
            cb(null, `${process.cwd()}/public/uploads/profile`);
        },
        filename: function(req, file, cb) {
			const ext = file.originalname.split('.').pop();
			const filename = `${shortid.generate()}.${ext}`;
			
			cb(null, filename);
        }
	})
}).single("pfp");

/**
 * Upload image
 */
function uploadImage(req, res, next) {
	upload(req, res, function(err) {
		if(err instanceof MulterError) {
			return next();
		}
	});
	
	next();
}

module.exports = uploadImage;
