// routes to user sign-up

module.exports = (app, firebase) => {
  app.post('/user/signup', (req, res) => {
    // perfom user signup here
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;

    // check that the user doesn't enter an empty field
    if (userName && email && password) {
      // create user with email and password
      firebase.auth().createUserWithEmailAndPassword(email, password)
       .then((user) => {
         // update the username of the user
         user.updateProfile({
           displayName: userName,
         });
         res.send({ message: 'Sign up Successful!' });
       }).catch(() => {
         res.send({ message: 'Error signing up :(' });
       });
    } else {
      // if email and password strings are empty
      res.send({
        message: 'Please make sure you enter all data'
      });
    }
  });
};
