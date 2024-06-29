
/**
 * Expand data
 */
function expandData(req) {
	// User
	let user = undefined;
	if(req.user) {
		// Remove javascript quirks
		user = JSON.parse(JSON.stringify(req.user));
	}
	
	// Messages
	let messages = [];
	const flashMessages = req.flash().messages;
	if(flashMessages) {
		messages = messages.concat(flashMessages);
	}
	
	return {
		user,
		messages
	};
}

module.exports = expandData;
