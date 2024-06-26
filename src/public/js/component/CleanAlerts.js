
/**
 * Clean alerts
 */
class CleanAlerts {
	constructor() {
		const obj = this;
		document.addEventListener("DOMContentLoaded", () => {
			this.cleanAlerts(obj);
		});
	}
	
	/**
	 * Clean alerts
	 */
	cleanAlerts(cleanAlerts) {
		const alerts = document.querySelector(".alertas");
		if(alerts && alerts.children) {
			const interval = setInterval(() => {
				if(alerts.children.length > 0) {
					alerts.removeChild(alerts.children[0]);
				} else {
					alerts.parentElement.removeChild(alerts);
					clearInterval(interval);
				}
			}, 2000);
		}
	}
}

module.exports = CleanAlerts;
