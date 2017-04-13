var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var bodyParser   = require('body-parser');
var debug        = require('debug')('app:http');
var cookieParser = require('cookie-parser');

// Load local libraries.
var env      = require('./backend/config/environment'),
    mongoose = require('./backend/config/database'),
    routes   = require('./backend/config/routes');

// Instantiate a server application.
var express = require('express');
var app = express();

// Configure the application (and set it's title!).
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + 'views'));
app.set('Western Christian Schools', env.TITLE);
app.set('Western Christian Schools', env.SAFE_TITLE);




//my code
//use res.render to load up an ejs view file
//index page
app.get('/', function(req, res, next)  {
  res.render('/views/pages/index');
});

//about page
app.get('/about', function(req, res, next) {
  res.render('/views/pages/about');
});

app.listen(3000);
console.log('3000 is the magic port');





// Create local variables for use thoughout the application.
app.locals.title = app.get('title');

// Logging layer.
app.use(logger('dev'));

// Helper layer (parses the requests, and adds further data).
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser('notsosecretnowareyou'));

// Routing layers: favicon, static assets, dynamic routes, or 404…

// Routes to static assets. Uncomment below if you have a favicon.
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

// Useful for debugging the state of requests.
app.use(debugReq);

// Defines all of our "dynamic" routes.
app.use('/api', routes);

// Catches all 404 routes.
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error-handling layer.
app.use(function(err, req, res, next) {
  // In development, the error handler will print stacktrace.
  err = (app.get('env') === 'development') ? err : {};
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

function debugReq(req, res, next) {
  debug('params:', req.params);
  debug('query:',  req.query);
  debug('body:',   req.body);
  next();
}

module.exports = app;
