var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var getRouter = require('./routes/get');
var setRouter = require('./routes/set');
var addBountyRouter = require('./routes/addBounty');
var retrieveTempSubmissionArrayRouter = require('./routes/retrieveTempSubmissionArray');
var addSubmissionRouter = require('./routes/addSubmission');
var getAllBountiesRouter = require('./routes/getAllBounties');
var paymentRouter = require('./routes/payment');
var updateModelRouter = require('./routes/updateModel');
var currentAmountRouter = require('./routes/currentAmount');
var searchBountyRouter = require('./routes/searchBounty');
var statisticsRouter = require('./routes/statistics')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/get', getRouter);
app.use('/set', setRouter);
app.use('/addBounty', addBountyRouter);
app.use('/retrieveTempSubmissionArray', retrieveTempSubmissionArrayRouter);
app.use('/addSubmission', addSubmissionRouter);
app.use('/getAllBounties', getAllBountiesRouter);
app.use('/payment', paymentRouter);
app.use('/updateModel', updateModelRouter);
app.use('/currentAmount', currentAmountRouter);
app.use('/searchBounty', searchBountyRouter);
app.use('/statistics', statisticsRouter);

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
