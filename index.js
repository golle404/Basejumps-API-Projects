var express = require("express");
var favicon = require('serve-favicon');

var path = require("path");

var routes = require("./app/routes/routes")
// env vars
require("dotenv").load();

var app = express();

// using jade as template engine
app.set('views', path.join(__dirname, '/app/views'));
app.set("view engine", "jade");
// favicon
app.use(favicon(__dirname + '/public/favicon.ico'));

// router
app.use('/', routes);

// static routes
app.use(express.static(path.join(__dirname, '/public')));

// listen
var port = process.env.PORT || 3000;

app.listen(port, function () {
	console.log("Server listening at" + port);
});