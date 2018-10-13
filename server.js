const path = require("path");
const express = require("express");
const handlebars = require("express-handlebars");
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const axios = require("axios");

// configure Express
var app = express();
var PORT = process.env.PORT || 8080;
app.use(express.static(path.join(__dirname, "public")));

// link routing data
require("./routes/api-routes");
require("./routes/html-routes");

// start server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});