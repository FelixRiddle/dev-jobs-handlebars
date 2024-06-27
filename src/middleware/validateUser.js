
/**
 * Validate user middleware for the frontend.
 */
function validateUserFrontend(req, res, next) {
	try {
		if(req.isAuthenticated()) {
			return next();
		}
		
		return res.redirect("/auth/login");
	} catch(err) {
		return res.redirect("500");
	}
}

/**
 * Validate user middleware for REST API
 */
function validateUser(req, res, next) {
	try {
		if(req.isAuthenticated()) {
			return next();
		}
		
		return res.status(401).send({
			messages: [{
                message: "Not authenticated",
                error: true,
            }]
		});
	} catch(err) {
		return res.status(500).send({
			messages: [{
				message: "Internal error",
                error: true,
			}]
		});
	}
}

exports.validateUserFrontend = validateUserFrontend;
exports.validateUser = validateUser;
