// routes to user sign in

// requrie firebase to sign in user


module.exports = (app, firebase) => {
  app.post('/user/signin', (req, res) => {
    // perfom user signin here
    const email = req.body.email;
    const password = req.body.password;
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      // console.log(user);
      res.send({ message: 'Sign in Successful!' });
    }).catch(() => {
      res.send({ message: 'Error signing in :(' });
    });
  });
};
