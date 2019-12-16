var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var app = express();

//Setup your own routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//Examples
var myauthRouter = require('./public/Examples/auth/router');


//ROUTING:Labs
var lab9Router = require('./public/labs/lab9/router');
var lab10Router = require('./public/labs/lab10/router');
var lab10jsonRouter = require('./public/labs/lab10A/router');

//Projects
var proj4Router = require('./public/projects/Project4A/router');

//Final Exam
var finalExam = require('./public/Exam/Final/router');

//Setup MySQL admin routes
//This will take the route /myadmin away from you!!!
// var mysqlAdmin = require('node-mysql-admin');
// app.use(mysqlAdmin(app));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs'); //render cares about these two parameters...tell the package that must be required

//render functions will ask at least two functions
//hbs allows for includes

app.engine('html', require('ejs').renderFile);
app.use(express.static("public"));

//Important Routers to have 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Final Exam Router
app.use('/public/Exam/Final', finalExam);

//Exercises
app.use('/', indexRouter);
app.use('/users', usersRouter);

//Examples
app.use('/auth', myauthRouter); 

//Labs
app.use('/public/labs/lab9', lab9Router); 
app.use('/public/labs/lab10', lab10Router);
app.use('/public/labs/lab10A', lab10jsonRouter);

//Projects
app.use('/public/projects/Project4A',proj4Router );

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
