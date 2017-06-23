// route to get all the users
module.exports = (app, firebase) => {
  app.get('/users', (req, res) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // user is signed in
        const db = firebase.database();

        // instantiate empty Map to hold users
        const users = new Map();

        const userReference = db.ref('/users/');
        userReference.once('value', (snapshot) => {
          snapshot.forEach((userSnapshot) => {
            users.set(userSnapshot.key, userSnapshot.val());
          });

          res.send({
            message: 'Users returned',
            userList: users
          });
        });
      } else {
        res.status(403).send({
          message: 'You are not signed in right now! '
        });
      }
    });
  });
};
