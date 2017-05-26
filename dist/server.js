'use strict';

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Set up express
var express = require('express');

var app = express();
var bodyParser = require('body-parser');

// import firebase
var firebase = require('firebase');

// configure port
var port = process.env.PORT || 6969;

// configure firebase
var config = {
  apiKey: 'AIzaSyAOCl6QRw5NYGGENE8URKteNO1rV7f1yo8',
  authDomain: 'post-it-69a9a.firebaseapp.com',
  databaseURL: 'https://post-it-69a9a.firebaseio.com',
  projectId: 'post-it-69a9a',
  storageBucket: 'post-it-69a9a.appspot.com',
  messagingSenderId: '383450311400'
};
firebase.initializeApp(config);

// body parser, used to grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// use routes imported
(0, _routes2.default)(app, firebase);

// default route
app.get('/*', function (req, res) {
  res.send({ message: 'Welcome to the PostIt app, fostering collaboration and building relationships' });
});

app.listen(port, function () {
  console.log('We are live on ' + port);
});