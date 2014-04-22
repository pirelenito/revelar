var fs = require('fs'),
    denodeify = require('rsvp').denodeify,
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

  loadConfig(slidesPath).then(function (config) {
    slidesList(slidesPath).then(function (slidesPath) {
      res.render('index.ejs', {
        config: config,
        slides: slidesPath
      });
    });
  });
});


function slidesList (slidesPath) {
  return denodeify(fs.readdir).call(fs, slidesPath).then(function (slides) {
    return slides.filter(function (slidePath) {
      return slidePath.toLowerCase().match(/(\.md)|(\.markdown)/);
    }).sort();
  }).then(null, function () {
    return [];
  });
}


function loadConfig (configPath) {
  return denodeify(fs.readFile).call(fs, configPath).then(function (data) {
    return JSON.parse(data);
  }).then(null, function () {
    return {
      theme: 'default'
    };
  });
}


module.exports = app;
