// Set up express
import express from 'express';
import path from 'path';
import webpack from 'webpack';
import firebase from 'firebase';
import webpackMiddleWare from 'webpack-dev-middleware';
import webpackHotMiddleWare from 'webpack-hot-middleware';
import bodyParser from 'body-parser';
import config from '../webpack.config.js';

import routes from './routes';


const app = express();

const compiler = webpack(config);
// configure port
const port = process.env.PORT || 6969;

// body parser, used to grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(webpackMiddleWare(compiler, {
  hot: true,
  publicPath: config.output.publicPath,
  noInfo: true,
}));
app.use(webpackHotMiddleWare(compiler));


// configure firebase
 const firebaseConfig = {
   apiKey: 'AIzaSyAOCl6QRw5NYGGENE8URKteNO1rV7f1yo8',
   authDomain: 'post-it-69a9a.firebaseapp.com',
   databaseURL: 'https://post-it-69a9a.firebaseio.com',
   projectId: 'post-it-69a9a',
   storageBucket: 'post-it-69a9a.appspot.com',
   messagingSenderId: '383450311400',
 };
 firebase.initializeApp(firebaseConfig);

// use routes imported
routes(app, firebase);

// default route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, () => {
  console.log(`We are live on ${port}`);
});
