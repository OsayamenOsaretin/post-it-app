import firebase from 'firebase';

export const firebaseInit = () => {
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
};

export const getDatabase = () => {
  const database = firebase.database();
  return database;
};

export const getAuth = () => {
  const auth = firebase.auth();
  return auth;
};

