const MAIL_CONFIG = {
	host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
	auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
};

module.exports = MAIL_CONFIG;
