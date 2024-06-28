const { validationResult } = require("express-validator");

/**
 * Validate the result of express-validator
 * 
 * Also stores in req.flash
 * 
 * Returns undefined if there are no errors otherwise returns the error messages
 */
function validateResult(req) {
	const result = validationResult(req);
	let messages = undefined;
	if (!result.isEmpty()) {
		messages = result.array().map((error) => {
			return {
				message: error.msg,
				error: true,
			};
		});
		
		req.flash('messages', messages);
	}
	
	return messages;
}

module.exports = validateResult;
