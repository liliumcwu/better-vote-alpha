const express = require('express'),
      path = require('path'),
      morgan = require('morgan'),
      favicon = require('serve-favicon'),
      bodyParser = require('body-parser');

const app = express();

//Config

//app.use(favicon(path.join(__dirname, 'public/favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//Routes

app.use('/api/elections', require('./api/routes/elections.js'));

//Server

const port = process.env.PORT || 1776;
app.listen(port, () => {
  console.log('Listening on port: ' + port);
});
