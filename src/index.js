const express = require("express");
const { engine } = require("express-handlebars");
const router = require('./routes/index');
const path = require('path');

const app = express();

const PORT = 3005;

// Enable handlebars as template engine
app.engine("handlebars", engine({
    defaultLayout: "layout",
}));
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.static(path.join(process.cwd(), "public")));

app.use("/", router);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

exports.PORT = PORT;
