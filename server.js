const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const axios = require("axios");

// configure Express
var app = express();
var PORT = process.env.PORT || 8080;
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);

// configure handlebars
app.engine("handlebars", exphbs({
    defaultLayout: "main",
    partialsDir: path.join(__dirname, "/views/partials")
}));
app.set("view engine", "handlebars");

// link routing data
require("./routes/api-routes")(app);
require("./routes/html-routes")(app, path);

// start server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});