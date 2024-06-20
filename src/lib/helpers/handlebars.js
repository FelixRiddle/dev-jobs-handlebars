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
        html += `<li>${skill}</li>`;
    });
	
	try {
		return options.fn().html = html;
	} catch(err) {
		// It throws error sometimes but works anyways
	}
}

module.exports = {
	selectSkills,
}
