const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const path = require("path");

// link Mongoose models
var db = {
  Article: require(path.join(__dirname, "/models/Article.js")),
  Note: require(path.join(__dirname, "/models/Note.js"))
}

// set port
var PORT = process.env.PORT || 3000

// initialize Express
var app = express();

// configure middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// configure handlebars
app.engine("handlebars", exphbs({
    defaultLayout: "main",
    partialsDir: path.join(__dirname, "/views/partials")
}));
app.set("view engine", "handlebars");

// connect to Mongo via Mongoose
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
var conn = mongoose.connection;

// Show any mongoose errors
conn.on("error", function(err) {
  console.log("DB connection error: ", err);
});
conn.once("open", function() {
  console.log("Connected to DB");
});

// link routes
require("./routes/html-routes")(app, db);
require("./routes/api-routes")(app, db);

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
