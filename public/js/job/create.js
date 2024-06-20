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
}

document.addEventListener("DOMContentLoaded", () => {
	const skillElements = document.querySelector(".lista-conocimientos");
	
	if(skillElements) {
		skillElements.addEventListener("click", addSkill);
	}
});
