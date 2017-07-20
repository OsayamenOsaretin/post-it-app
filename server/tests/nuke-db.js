// import * as admin from 'firebase-admin';
// import serviceKey from '../service-account-key.json';

// admin.initializeApp({
//   credential: admin.credential.cert(serviceKey),
//   databaseURL: 'https://test-postit-df14c.firebaseio.com'
// });

// let user;
// const users = [];

// const userRef = admin.database.ref('/users');
// userRef.once('value').then((snapShot) => {
//   snapShot.forEach((childSnapshot) => {
//     user = childSnapshot.val();
//     users.push(user);
//   });
// });

// const deleteUser = function deleteUser(userParams) {
//   return new Promise((resolve) => {
//     admin.auth()
//     .deleteUser(userParams.uid)
//     .then(() => {
//       resolve(user);
//     })
//     .catch(() => {
//       resolve(user);
//     });
//   });
// };

// function nukeDb() {
//   admin.database.ref().remove()
//   .then(() => {
//     process.exit();
//   }).catch(() => {
//     process.exit();
//   });
// }

// if (users.length > 0) {
//   const promises = users.map(eachUser => deleteUser(eachUser));
//   Promise.all(promises)
//   .then(nukeDb)
//   .catch();
// } else {
//   nukeDb();
// }



