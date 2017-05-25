import routes from './routes';

// Set up express
const express = require('express');

const app = express();
const bodyParser = require('body-parser');

// import firebase
const firebase = require('firebase');

// configure port
const port = process.env.PORT || 6969;

// configure firebase
const config = {
  apiKey: 'AIzaSyAOCl6QRw5NYGGENE8URKteNO1rV7f1yo8',
  authDomain: 'post-it-69a9a.firebaseapp.com',
  databaseURL: 'https://post-it-69a9a.firebaseio.com',
  projectId: 'post-it-69a9a',
  storageBucket: 'post-it-69a9a.appspot.com',
  messagingSenderId: '383450311400',
};
firebase.initializeApp(config);

// body parser, used to grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// use routes imported
routes(app, firebase);

app.listen(port, () => {
  console.log(`We are live on ${port}`);
});
