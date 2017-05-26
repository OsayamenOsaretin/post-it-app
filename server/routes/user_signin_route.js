// routes to user sign in

module.exports = (app, firebase) => {
  app.post('/user/signin', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // check that email and password body are not empty
    if (email && password) {
      // sign in with user and email using firebase authentication
      firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
        res.send({ message: 'Welcome User, or Ranger.' });
      }).catch(() => {
        res.send({ message: 'Error signing in :(' });
      });
    } else {
      // send error message in case of empty email and password
      res.send({ message: 'Please enter the right email and password' });
    }
  });
};
