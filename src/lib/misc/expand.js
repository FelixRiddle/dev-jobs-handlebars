
/**
 * Expand data
 */
function expandData(req) {
	// User
	let user = undefined;
	if(req.user) {
		user = JSON.parse(JSON.stringify(req.user));
	}
	
	// Messages
	let messages = [];
	const flashMessages = req.flash().messages;
	if(flashMessages) {
		messages.concat(flashMessages);
	}
	
	return {
		// Remove javascript quirks
		user,
		messages
	};
}

module.exports = expandData;
