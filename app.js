var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var app = express();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs'); //render cares about these two parameters...tell the package that must be required
//render functions will ask at least two functions
//hbs allows for includes
app.engine('html', require('ejs').renderFile);
app.use(express.static("public"));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//////////////////////////////////
//ROUTING:Labs
/////////////////////////////////
var lab9Router = require('./public/labs/lab9/router');
var lab10Router = require('./public/labs/lab10/router');
var proj4Router = require('./public/projects/Project4A/router');

////Routing: Examples 
var myauthRouter = require('./public/Examples/auth/router');


//Setup MySQL admin routes
//This will take the route /myadmin away from you!!!
// var mysqlAdmin = require('node-mysql-admin');
// app.use(mysqlAdmin(app));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//app.use('/', exerRouter);
app.use('/public/labs/lab9', lab9Router); 
app.use('/public/labs/lab10', lab10Router);
app.use('/public/projects/Project4A',proj4Router );

// //Examples
// app.use('/Examples/auth', authExampleRouter);
app.use('/auth', myauthRouter); 

//Enable sessions
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
