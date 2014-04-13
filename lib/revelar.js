var express = require('express'),
    connect = require('connect'),
    ejs = require('ejs'),
    path = require('path'),
    revealPath = path.join(__dirname, '../node_modules/reveal.js');

var app = express();

app.engine('ejs', ejs.renderFile);

app.use(connect.static(revealPath, { 'index': 'ignore' }));

app.get('/', function (req, res) {
  res.render('index.ejs');
});

module.exports = app;
