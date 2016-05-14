var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var errorhandler = require('errorhandler');
require('./model');
var auth = require('./middleware/auth');
var MongoClient = require('mongodb').MongoClient;
var log4js = require('log4js');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

var webRouter = require('./web_router');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs-mate'));

//log4js
log4js.configure({
  appenders: [
    { type: 'console' }, //控制台输出
    {
      type: 'file', //文件输出
      filename: 'access.log',
      maxLogSize: 0,
      backups: 4,
      catagory: 'normal'
    }
  ],
  replaceConsole: true
});

var logger = log4js.getLogger('normal');
logger.setLevel('INFO');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
/*app.use(logger('dev'));
*/app.use(express.static(path.join(__dirname, 'public')));
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

/*app.use(log4js.connectLogger(logger, {level:log4js.levels.INFO}));*/
// app.use(log4js.connectLogger(logger, {level: log4js.levels.INFO, format:':method :url'}));
app.use(log4js.connectLogger(logger, {level: log4js.levels.INFO, format:':method :url'}));
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

/*exports.logger = function(name) {
  var logger = log4js.getLogger(name);
  logger.setLevel('INFO');
  return logger;
}*/