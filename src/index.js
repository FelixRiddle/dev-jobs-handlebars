const express = require("express");
const router = require('./routes/index');

const app = express();

const PORT = 3005;

app.use("/", router);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

exports.PORT = PORT;
