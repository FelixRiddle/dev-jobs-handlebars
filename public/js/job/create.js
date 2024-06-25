const skills = new Set();

/**
 * Add skill
 */
function addSkill(e) {
	if(e.target.tagName === "LI") {
		if(e.target.classList.contains("activo")) {
			skills.delete(e.target.textContent);
			e.target.classList.remove("activo");
		} else {
			skills.add(e.target.textContent);
			e.target.classList.add("activo");
		}
	}
	
	const skillsArray = [...skills];
	document.querySelector("#skills").value = skillsArray;
}

document.addEventListener("DOMContentLoaded", () => {
	const skillElements = document.querySelector(".lista-conocimientos");
	
	if(skillElements) {
		skillElements.addEventListener("click", addSkill);
		
		// Once we are editing, call the function
		selectSkills();
	}
});

/**
 * Select skills
 */
function selectSkills() {
	const selected = Array.from(document.querySelectorAll(".lista-conocimientos .activo"));
	
	const selectedSkills = selected.forEach(skill => skill.textContent);
	
	selectedSkills.forEach(select => {
		skills.add(select);
	});
	
	document.querySelector("#skills").value = selectedSkills;
}
