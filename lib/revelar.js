var fs = require('fs'),
    express = require('express'),
    connect = require('connect'),
    ejs = require('ejs'),
    path = require('path');

var revealPath = path.join(__dirname, '../node_modules/reveal.js'),
    slidesPath = path.join(process.cwd(), 'slides');

var app = express();

app.engine('ejs', ejs.renderFile);
app.use(connect.static(revealPath, { 'index': 'ignore' }));
app.use('/slides', connect.static(slidesPath));

app.get('/', function (req, res) {
  res.render('index.ejs', { slides: slidesList() });
});

function slidesList () {
  var slides = fs.readdirSync(slidesPath);
  return slides.filter(function (slidePath) {
    return slidePath.toLowerCase().match(/(\.md)|(\.markdown)/);
  }).sort();
}

module.exports = app;
