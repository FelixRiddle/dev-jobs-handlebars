const { PORT } = require("./env");

function getUrl() {
	return `http://localhost:${PORT}`;
}

module.exports = getUrl;
