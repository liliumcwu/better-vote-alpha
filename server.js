require('dotenv').config();
const express = require('express'),
      path = require('path'),
      morgan = require('morgan'),
      session = require('express-session'),
      favicon = require('serve-favicon'),
      hbs = require('express-handlebars'),
      bodyParser = require('body-parser');

const app = express();

//Config

//app.use(favicon(path.join(__dirname, 'public/favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({secret: 'keyboard cat', resave: false, saveUninitialized: true}));;
app.use(express.static(path.join(__dirname, 'public')));
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'main', layoutsDir: path.join(__dirname, 'views/layouts/')}))
app.set('view engine', 'hbs')

//Routes

app.use('/api/elections', require('./api/routes/elections.js'));
app.use('/auth', require('./api/routes/auth.js'));
app.use('/api/admins', require('./api/routes/admin.js'));
app.use('/ballots', require('./api/routes/ballots.js'));

//Server

const port = process.env.PORT || 1776;
app.listen(port, () => {
  console.log('Listening on port: ' + port);
});
