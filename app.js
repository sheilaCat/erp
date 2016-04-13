var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var errorhandler = require('errorhandler');
require('./model');
var auth = require('./middleware/auth');
var MongoClient = require('mongodb').MongoClient;
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

var webRouter = require('./web_router');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs-mate'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('ERP'));
app.use(session({
  secret: '',
  store: new RedisStore({
    port: '6379',
    host: '127.0.0.1',
  }),
  resave: true,
  saveUninitialized: true,
}));
app.use(auth.authUser);

//routers
app.use('/', webRouter);

// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
*/
//error handle
if (app.get('env') === 'development') {
  app.use(errorhandler());
} else {
  app.use(function (err, req, res, next) {
    logger.error(err);
    return res.status(500).send('500 status');
  });
}


module.exports = app;
