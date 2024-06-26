const { languages, frameworks } = require("../job/jobSkills")

/**
 * Select skills
 */
function selectSkills(selected = [], options) {
	const skills = [
		...languages,
		...frameworks
	];
	
	let html = "";
	
	skills.forEach(skill => {
		const activeClass = selected.includes(skill) ? "activo" : "";
		
        html += `<li class="${activeClass}">${skill}</li>`;
    });
	
	try {
		return options.fn().html = html;
	} catch(err) {
		// It throws error sometimes but works anyways
	}
}

/**
 * Contract type helper
 * 
 * @deprecated Not working
 */
function contractType(selected, options) {
	console.log(`Selected: `, selected);
	const lookForValue = ` value="${selected}"`;
	console.log(`Look for value: `, lookForValue);
	const regexTest = new RegExp(lookForValue);
	const result = regexTest.test(options.fn(this));
	
	const replaceResult = options.fn(this).replace(
		result,
		`$& selected="selected"`
	);
	
	console.log(`Result: `, result);
	console.log(`Replace result: `, replaceResult);
	
    return replaceResult;
}

/**
 * Handle select contract type
 * 
 * We will use dom manipulation because it's easier and works.
 * 
 * @deprecated Can't access the dom
 */
function handleSelectContractType(selected, options) {
	console.log(`Options: `, options);
	console.log(`Options fn: `, options.fn(this));
	
	// Get elements
	const contractElement = document.getElementById("contract");
	
	console.log(`Contract element: `, contractElement);
}

/**
 * Show user messages
 */
function showUserMessages(messages = {}, alerts) {
	console.log(`Received messages in the frontend: `, messages);
	
	let html = "";
	if(messages.length > 0) {
		messages.forEach(message => {
			html += `<div class="error alerta">${message.message}</div>`;
		});
	}
	
    try {
        return alerts.fn().html = html;
    } catch(err) {}
}

module.exports = {
	selectSkills,
	contractType,
	handleSelectContractType,
	showUserMessages
};
