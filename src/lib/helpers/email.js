const MAIL_CONFIG = require("../config/email");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const util = require("util");

const transport = nodemailer.createTransport({
	...MAIL_CONFIG
});

transport.use('compile', hbs({
	viewEngine: 'handlebars',
	viewPath: `${process.cwd()}/views/emails`,
	ext: ".handlebars",
}));

/**
 * Send email
 */
function sendMail(options) {
	if(!options.email) {
		throw Error("Email is required");
	}
	
	if(!options.message) {
		throw Error("What are you gonna send air? Message is required");
	}
	
	if(!options.subject) {
		throw Error("No subject given");
	}
	
	const emailConfiguration = {
		from: `devJobs <${process.env.MAIL_USERNAME}@${process.env.MAIL_HOST}>`,
		to: options.email,
		subject: options.subject,
		text: options.message,
		template: options.file,
		context: options.context,
	};
	
	const sendMailPromise = util.promisify(transport.sendMail, transport);
	
	const sentMail = sendMailPromise.call(transport, emailConfiguration);
	
	return sentMail;
}

module.exports = sendMail;
