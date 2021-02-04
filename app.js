var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var uploadRouter = require('./routes/upload');
var uploadImageRouter = require('./routes/Upload-image');
var imageRecogRouter = require('./routes/Image-Recog');
var imageRecognitionRouter = require('./routes/Image-Recognition');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/upload', uploadRouter);
app.use('/upload', uploadImageRouter);
app.use('/imageRecog', imageRecognitionRouter);
app.use('/imageRecog', imageRecogRouter);

module.exports = app;