var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose=require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var configdb=require('./config/db');
var User=require('./models/users');
var Book=require('./models/book');
var Issue=require('./models/issue');
var index = require('./routes/index');
var users = require('./routes/users');
var log_action = require('./routes/log_action');
var sign_action = require('./routes/sign_action');
var book_add = require('./routes/book_add');
//var delete_member = require('./routes/delete_member');
var issue = require('./routes/issue');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

mongoose.connect(configdb.url);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  store: new MongoStore({
    //@NOTE reusing mongoose connection. else use url: mongourl
    mongooseConnection: mongoose.connection,
    collection: 'session',
    auto_reconnect: true,
    autoRemove: 'interval',
    autoRemoveInterval: 10 // In minutes. Default
  }),
  name:'library.sid',
  resave:false,
  saveUninitialized:false,
  secret: 'S3CRE7'

  //@NOTE a session is set only if we add/delete/edit a session variable eg: req.session.name
  //@NOTE if you want to save sessions for all including unmodified then enable saveUninitialized: true
  //@NOTE usually a session is resaved to store only when it is modified, but if you want to save always
  //@NOTE then enable resave: true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/log_action', log_action);
app.use('/sign_action', sign_action);
app.use('/book_add',book_add);
//app.use('/delete_member',delete_member);
app.use('/issue',issue);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
