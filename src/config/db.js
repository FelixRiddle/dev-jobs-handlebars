const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({
    path: ".env"
});

const jobSchema = require('../model/Job');

const MONGODB_HOST = process.env.MONGODB_HOST || "localhost";
const MONGODB_PORT = process.env.MONGODB_PORT || 27017;
const MONGODB_URI = `mongodb://${MONGODB_HOST}:${MONGODB_PORT}`;

exports.MONGODB_URI = MONGODB_URI;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
});

mongoose.connection.on('error', (error) => {
    console.error(error);
});
