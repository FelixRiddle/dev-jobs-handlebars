const jwt = require("jsonwebtoken");

/**
 * Validate user middleware for the frontend.
 */
function validateUserFrontend(req, res, next) {
	try {
		if(req.isAuthenticated()) {
			return res.redirect("/auth/login");
		}
		
		return next();
	} catch(err) {
		return res.redirect("500");
	}
}

/**
 * Validate user middleware for REST API
 */
function validateUser(req, res, next) {
	try {
        // Get token
        let { token } = req.cookies;
		
		// Check token
		if(!token) {
			return res.status(401).send({
				messages: [{
					message: "Not authenticated",
					error: true,
				}]
			});
		}
		
		// Validate token
		const user = jwt.verify(token, process.env.SECRET_TOKEN);
        if(!user) {
            return res.status(401).send({
                messages: [{
                    message: "Not authenticated",
                    error: true,
                }]
            });
        }
        
        req.user = user;
		
		next();
	} catch(err) {
		console.error(err);
		return res.status(500).send({
			messages: [{
				message: "Internal error",
                error: true,
			}]
		});
	}
}

/**
 * Validate user with passport
 */
function validateUserPassport(req, res, next) {
    try {
		const isAuthenticated = req.isAuthenticated();
		console.log(`Is authenticated: `, isAuthenticated);
		
        if(!isAuthenticated) {
			return res.status(401).send({
				messages: [{
					message: "Not authenticated",
					error: true,
				}]
			});
        }
        
		return next();
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
