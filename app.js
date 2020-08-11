const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const app = express();
const docsRouter = require('./routes/docs');

app.use(logger('dev'));
app.use(cors());
app.use(fileUpload());
app.use(express.json({
  limit: '50mb'
}));
app.use(express.urlencoded({
  extended: false, 
  limit: '50mb'
}));

app.use('/docs/upload', docsRouter);

// catch 404 and forward to google
app.use(function(req, res, next) {
  res.redirect('https://google.com')
});

module.exports = app;
