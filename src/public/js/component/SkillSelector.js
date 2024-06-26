
/**
 * Skill selector class
 */
class SkillSelector {
	skills = new Set();
	
	constructor() {
		const obj = this;
		document.addEventListener("DOMContentLoaded", () => {
			const skillElements = document.querySelector(".lista-conocimientos");
			
			if(skillElements) {
				skillElements.addEventListener("click", (e) => this.addSkill(e, this));
				
				// Once we are editing, call the function
				obj.selectSkills();
			}
		});
	}
	
	/**
	 * Add skill
	 */
	addSkill(e, skillSelector) {
		if(e.target.tagName === "LI") {
			if(e.target.classList.contains("activo")) {
				skillSelector.skills.delete(e.target.textContent);
				e.target.classList.remove("activo");
			} else {
				skillSelector.skills.add(e.target.textContent);
				e.target.classList.add("activo");
			}
		}
		
		const skillsArray = [...skillSelector.skills];
		document.querySelector("#skills").value = skillsArray;
	}
	
	/**
	 * Select skills
	 */
	selectSkills() {
		const selected = Array.from(document.querySelectorAll(".lista-conocimientos .activo"));
		if(!selected) {
			console.error("Couldn't find active skills");
			return;
		}
		
		// Check length
		if(selected.length === 0) {
			return;
		}
		
		const selectedSkills = selected.forEach(skill => skill.textContent);
		
		selectedSkills.forEach(select => {
			this.skills.add(select);
		});
		
		document.querySelector("#skills").value = selectedSkills;
	}
}

module.exports = SkillSelector;
