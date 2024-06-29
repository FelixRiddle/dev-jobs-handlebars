const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const { engine } = require("express-handlebars");
const express = require("express");
const flash = require("connect-flash");
const fs = require('fs');
const MongoStore = require("connect-mongo");
const mongoose = require('mongoose');
const path = require('path');
const session = require("express-session");

const helpers = require("./lib/helpers/handlebars");
const router = require('./routes/index');
const { MONGODB_URI } = require('./lib/config/db');
const { PORT } = require("./lib/config/env");
const passport = require("./lib/config/passport");

require('dotenv').config({
    path: ".env",
});

// Create folders
if (!fs.existsSync(path.join(process.cwd(), 'public', 'uploads'))) {
    fs.mkdirSync(path.join(process.cwd(), 'public', 'uploads'));
}

const uploadsPath = "public/uploads";
if (!fs.existsSync(path.join(process.cwd(), uploadsPath, 'profile'))) {
    fs.mkdirSync(path.join(process.cwd(), uploadsPath, 'profile'));
}

if(!fs.existsSync(path.join(process.cwd(), uploadsPath, 'resume'))) {
	fs.mkdirSync(path.join(process.cwd(), uploadsPath, 'resume'));
}

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true,
}));

// Public folder
app.use(express.static(path.join(process.cwd(), "public")));

// Useful middlewares
app.use(cookieParser());
app.use(session({
    secret: process.env.SECRET_TOKEN,
    key: process.env.SECRET_KEY_NAME,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: MONGODB_URI,
    })
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Alerts and flash messages
app.use(flash());

// Enable handlebars as template engine
app.engine("handlebars", engine({
    defaultLayout: "layout",
	helpers,
}));
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use((req, res, next) => {
	res.locals.messages = req.flash();
	next();
});

// Routes
app.use("/", router);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
