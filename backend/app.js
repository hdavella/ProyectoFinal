var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');

// generado por hdavella
require('dotenv').config(); 
var session = require('express-session');
var fileUpload = require('express-fileupload');
var loginRouter = require('./routes/admin/login');
var trabajosRouter = require('./routes/admin/trabajos');
var advertenciaRouter = require('./routes/admin/advertencia');
var logoutRouter = require('./routes/admin/logout');
var apiRouter = require('./routes/api');
var altaokRouter = require('./routes/admin/altaok');


var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(fileUpload({
  useTempFiles:true,
  tempFileDir:'/tmp/'
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//variables de sesión
app.use(session({
  secret:"todo debe hacerse lo mas simple posible. Pero no mas sencillo",
  resave: false,
  saveUninitialized: true
}));
//middleware
secured = async (req, res, next) => {
  try{
    console.log(req.session.id_usuario);
    if(req.session.id_usuario){
      next();
    }else{
      res.redirect('/admin/advertencia');
    }
  }catch(error){
    console.log(error);
  }
}
app.use('/api', cors(), apiRouter);

app.use('/', indexRouter);
// generado por hdavella
app.use('/admin/login', loginRouter);
app.use('/admin/trabajos', secured, trabajosRouter);
app.use('/admin/advertencia', advertenciaRouter);
app.use('/admin/logout', logoutRouter);
app.use('/admin/altaok', altaokRouter);

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
