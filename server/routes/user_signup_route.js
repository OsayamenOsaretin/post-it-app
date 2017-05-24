// routes to user sign-up

// require firebase to create user


module.exports = (app, firebase) => {
  app.post('/user/signup', (req, res) => {
    // perfom user signup here
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
      user.updateProfile({
        displayName: userName,
      }).then(() => {
        // console.log('Username updated successfully');
        console.log(user);
      });
      res.send({ message: 'Sign up Successful!' });
    }).catch(() => {
      res.send({ message: 'Error signing up :(' });
    });
  });
};
