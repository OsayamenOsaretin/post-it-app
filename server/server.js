// Set up express
const express = require('express');

const app = express();
const bodyParser = require('body-parser');

// import firebase
const firebase = require('firebase');

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


const db = firebase.database();

// Configure app


// body parser, used to grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POSTS');
  res.setHeader('Access-Control-Allow-Headers',
  'X-Requested-With,content-type, Authorization');
  next();
});

require('./routes')(app, db);

app.listen(port, () => {
  // console.log(`We are live on ${port}`);
});
