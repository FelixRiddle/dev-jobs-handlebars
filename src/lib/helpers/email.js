const MAIL_CONFIG = require("../config/email");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const util = require("util");

const transport = nodemailer.createTransport({
	...MAIL_CONFIG
});

module.exports = transport;
