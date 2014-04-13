var fs = require('fs'),
    express = require('express'),
    connect = require('connect'),
    ejs = require('ejs'),
    path = require('path');

var revealPath = path.join(__dirname, '../node_modules/reveal.js'),
    viewsPath = path.join(__dirname, '../views'),
    slidesPath = path.join(process.cwd(), 'slides'),
    customThemesPath = path.join(process.cwd(), 'themes'),
    configPath = path.join(process.cwd(), 'revelar_config.json');


var app = express();


app.set('views', viewsPath);


app.engine('ejs', ejs.renderFile);
app.use(connect.static(revealPath, { 'index': 'ignore' }));
app.use('/slides', connect.static(slidesPath));
app.use('/css/theme', connect.static(customThemesPath));


app.get('/', function (req, res) {
  var config = loadConfig();

  res.render('index.ejs', {
    theme: config.theme,
    slides: slidesList()
  });
});


function slidesList () {
  var slides = fs.readdirSync(slidesPath);
  return slides.filter(function (slidePath) {
    return slidePath.toLowerCase().match(/(\.md)|(\.markdown)/);
  }).sort();
}


function loadConfig () {
  try {
    return JSON.parse(fs.readFileSync(configPath));
  } catch (e) {
    return {
      theme: 'default'
    };
  }
}


module.exports = app;
