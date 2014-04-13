var express = require('express'),
    connect = require('connect'),
    path = require('path'),
    revealPath = path.join(__dirname, '../node_modules/reveal.js');

var app = express();

app.use(connect.static(revealPath));

module.exports = app;
