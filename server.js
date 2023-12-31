// file : /server.js
const methodOverride = require("method-override");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
// new code below
var session = require('express-session');
var passport = require('passport');


require("dotenv").config();
require("./config/database");
require('./config/passport');

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const ticketsRouter = require("./routes/tickets"); //ticket router
const commentsRouter = require('./routes/comments'); //comment router

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(methodOverride("_method"));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
  
}))
app.use(passport.initialize());
app.use(passport.session());
// Add this middleware BELOW passport middleware
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use(express.urlencoded({ extended: false }));
app.use("/tickets", ticketsRouter); //ticket router used
app.use("/", commentsRouter); //comment router used


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.render('404.ejs', {title: 'Page Not Found'});
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
