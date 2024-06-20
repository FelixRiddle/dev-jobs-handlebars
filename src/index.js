const cookieParser = require("cookie-parser");
const { engine } = require("express-handlebars");
const express = require("express");
const mongoose = require('mongoose');
const path = require('path');
const session = require("express-session");

const MongoStore = require("connect-mongo");

const router = require('./routes/index');

const { MONGODB_URI } = require('./config/db');

require('dotenv').config({
    path: ".env",
});

const app = express();

const PORT = 3005;

// Enable handlebars as template engine
app.engine("handlebars", engine({
    defaultLayout: "layout",
}));
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.static(path.join(process.cwd(), "public")));

console.log(`Mongodb uri: `, MONGODB_URI);
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

app.use("/", router);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

exports.PORT = PORT;
