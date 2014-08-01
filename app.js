var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var dirWalker = require('./lib/walk.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// add cPath and cRender
app.use(function (req, res, next) {
    var path = req.url.substr(1);
    res.cPath = path;
    res.cRender = function (params) {
        res.render(res.cPath, params);
    }
    next();
});

////TODO
dirWalker.walk(__dirname + "/routes", 0, function(path, floor) {
  if (floor === 0) {
    return;
  }
  var p = path.substr((__dirname + "/routes").length);
  app.use(p.substr(0,p.length-3), require("./routes" + p));
});

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
