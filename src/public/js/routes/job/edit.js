const SkillSelector = require("../../component/SkillSelector");

const skillSelector = new SkillSelector();

/**
 * Select contract
 */
function selectContract() {
	const contractValue = document.getElementById("previousContract");
	if(!contractValue) {
		console.error("Contract value element not found");
		return;
	}
	const contractName = contractValue.value;
	
	const contract = document.getElementById("contract");
	if(!contract) {
		console.log("Contract element not found");
		return;
	}
	
	contract.value = contractName;
}

selectContract();
