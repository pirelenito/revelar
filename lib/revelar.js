var fs = require('fs'),
    express = require('express'),
    connect = require('connect'),
    ejs = require('ejs'),
    path = require('path');


var revealPath = path.join(__dirname, '../node_modules/reveal.js'),
    undercorePath = path.join(__dirname, '../node_modules/underscore'),
    viewsPath = path.join(__dirname, '../views');


var app = express();


app.set('views', viewsPath);
app.set('slidesPath', process.cwd());


app.engine('ejs', ejs.renderFile);
app.use(connect.static(revealPath, { 'index': 'ignore' }));
app.use('/js', connect.static(undercorePath));


app.use('/slides', function () {
  var slidesPath = app.get('slidesPath');

  return connect.static(slidesPath).apply(this, arguments);
});


app.use('/css/theme', function () {
  var slidesPath = app.get('slidesPath'),
      customThemesPath = path.join(slidesPath, 'themes');

  return connect.static(customThemesPath).apply(this, arguments);
});


app.get('/', function (req, res) {
  var slidesPath = app.get('slidesPath'),
      configPath = path.join(slidesPath, 'revelar_config.json');

  var config = loadConfig(configPath);

  res.render('index.ejs', {
    config: config,
    slides: slidesList(slidesPath)
  });
});


function slidesList (slidesPath) {
  var slides = fs.readdirSync(slidesPath);
  return slides.filter(function (slidePath) {
    return slidePath.toLowerCase().match(/(\.md)|(\.markdown)/);
  }).sort();
}


function loadConfig (configPath) {
  try {
    return JSON.parse(fs.readFileSync(configPath));
  } catch (e) {
    return {
      theme: 'default'
    };
  }
}


module.exports = app;
