'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _firebase = require('./firebase');

var _firebase2 = _interopRequireDefault(_firebase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Set up express
var app = (0, _express2.default)();

// configure port
var port = process.env.PORT || 6969;

// // configure firebase
// const config = {
//   apiKey: 'AIzaSyAOCl6QRw5NYGGENE8URKteNO1rV7f1yo8',
//   authDomain: 'post-it-69a9a.firebaseapp.com',
//   databaseURL: 'https://post-it-69a9a.firebaseio.com',
//   projectId: 'post-it-69a9a',
//   storageBucket: 'post-it-69a9a.appspot.com',
//   messagingSenderId: '383450311400',
// };
// firebase.initializeApp(config);

// body parser, used to grab information from POST requests
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

// use routes imported
(0, _routes2.default)(app, _firebase2.default);

// default route
app.get('/*', function (req, res) {
  res.send({ message: 'Welcome to the PostIt app, fostering collaboration and building relationships' });
});

app.listen(port, function () {
  console.log('We are live on ' + port);
});