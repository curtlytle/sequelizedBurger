var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

var app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 8080;
// Requiring our models for syncing
var db = require("./models");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/burgers_controller.js");

app.use("/", routes);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});
