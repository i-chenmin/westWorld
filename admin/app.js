var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require('cors');
// 固定设定 mongodb 连接地址
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/westWorld', {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');    // 新增模块需要添加的部分
var newsRouter = require('./routes/news');
var commentsRouter = require('./routes/comments');
var cateRouter = require('./routes/cate');
var cateClassifyRouter = require('./routes/cateClassify');
var orderRouter = require('./routes/order');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/news', newsRouter);
app.use('/comments', commentsRouter);
app.use('/cate', cateRouter);
app.use('/cateClassify', cateClassifyRouter);
app.use('/order', orderRouter);

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

app.all("*", function(req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers", "content-type");
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  if(req.method.toLowerCase() == 'options'){
    res.send(200); //让options尝试请求快速结束
  }else{
    next();
  }
});

module.exports = app;
