//Server Dependencies
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(express.static('app/public'));

app.listen(PORT, function() {
	console.log(`API server listening on PORT ${PORT}`);
});