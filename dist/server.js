'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _webpack3 = require('../webpack.config');

var _webpack4 = _interopRequireDefault(_webpack3);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

// configure port
// Set up express
var port = process.env.PORT || 6969;

if (process.env.NODE_ENV !== 'production') {
  var compiler = (0, _webpack2.default)(_webpack4.default);

  // body parser, used to grab information from POST requests
  app.use(_bodyParser2.default.urlencoded({ extended: true }));
  app.use(_bodyParser2.default.json());

  app.use((0, _webpackDevMiddleware2.default)(compiler, {
    hot: true,
    publicPath: _webpack4.default.output.publicPath,
    noInfo: true
  }));
  app.use((0, _webpackHotMiddleware2.default)(compiler));
}

app.use(_express2.default.static(_path2.default.join(__dirname, '../dist')));

// configure firebase
var firebaseConfig = {
  apiKey: 'AIzaSyAOCl6QRw5NYGGENE8URKteNO1rV7f1yo8',
  authDomain: 'post-it-69a9a.firebaseapp.com',
  databaseURL: 'https://post-it-69a9a.firebaseio.com',
  projectId: 'post-it-69a9a',
  storageBucket: 'post-it-69a9a.appspot.com',
  messagingSenderId: '383450311400'
};
_firebase2.default.initializeApp(firebaseConfig);

// use routes imported
(0, _routes2.default)(app, _firebase2.default);

// default route
app.get('/*', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, '../dist/index.html'));
});

app.listen(port, function () {
  console.log('We are live on ' + port);
});