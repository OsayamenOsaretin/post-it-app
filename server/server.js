// Set up express
import express from 'express';
import path from 'path';
import webpack from 'webpack';
import firebase from 'firebase';
import socketio from 'socket.io';
import webpackMiddleWare from 'webpack-dev-middleware';
import webpackHotMiddleWare from 'webpack-hot-middleware';
import bodyParser from 'body-parser';
import routes from './index';
import socketConfig from './utilities/socketConfig';

require('dotenv').config();

const firebaseConfig = {
  apiKey: 'AIzaSyAOCl6QRw5NYGGENE8URKteNO1rV7f1yo8',
  authDomain: 'post-it-69a9a.firebaseapp.com',
  databaseURL: 'https://post-it-69a9a.firebaseio.com',
  projectId: 'post-it-69a9a',
  storageBucket: 'post-it-69a9a.appspot.com',
  messagingSenderId: '383450311400',
};
firebase.initializeApp(firebaseConfig);

const app = express();

// configure port
const port = process.env.PORT || 6969;

const server = app.listen(port);

const io = socketio(server);

io.on('connection', (socket) => {
  console.log('Connected');
  socket.on('disconnect', () => {
    console.log('Disconnected');
  });
});

socketConfig.socketInstance(io);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const config= require('../webpack.config');   // eslint-disable-line
const compiler = webpack(config);
if (process.env.development) {
  app.use(webpackMiddleWare(compiler, {
    hot: true,
    publicPath: config.output.publicPath,
    noInfo: true,
  }));
  app.use(webpackHotMiddleWare(compiler));
}

app.use(express.static(path.join(__dirname, '../dist')));

// use routes imported
routes(app);

// default route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

