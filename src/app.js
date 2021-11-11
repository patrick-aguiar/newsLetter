const express = require("express");
const routes = require("./routes");
const path = require('path');

const app = express();

const publicPath = path.resolve(__filename + '/../../public');

app.use(express.static(publicPath)); //Because this file use local and out side files, we need to declare as static
app.use(express.urlencoded({extended: true})); //This makes possible to select and use elements of the HTML document (parseFloat(req.body.lastName);)

app.use('/', routes);

module.exports = app;