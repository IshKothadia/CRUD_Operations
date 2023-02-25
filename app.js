// installed 3rd party packages
require('dotenv').config;
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let bodyParser = require('body-parser');
const controller = require('./server/controller/controller');
const passport = require('passport');
const session = require('express-session');
const authRoutes = require('./server/routes/auth');

const connectDb = require('./server/database/connection'); 

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
const { title } = require('process');

let app = express();

//mongoDb Connection
connectDb();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // express -e

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(session({
  secret: "process.env.SECRET",
  resave:false,
  saveUninitialized:false
}));

app.use('/', authRoutes);

//initialize passport
app.use(passport.initialize());

// use passport to deal with session
app.use(passport.session());

app.use(function(req, res, next){
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

//API
app.post('/api/contacts',controller.create);
app.get('/api/contacts',controller.find);
app.put('/api/contacts/:id',controller.update);
app.delete('/api/contacts/:id',controller.delete);

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
  res.render('error', {title:"Error"});
});

module.exports = app;
