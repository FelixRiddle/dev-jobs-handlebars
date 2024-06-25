const { languages, frameworks } = require("../job/jobSkills")

/**
 * Select skills
 */
function selectSkills(selected = [], options) {
	const skills = [
		...languages,
		...frameworks
	];
	
	console.log(`Selected skills: `, selected);
	
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

module.exports = {
	selectSkills,
}
