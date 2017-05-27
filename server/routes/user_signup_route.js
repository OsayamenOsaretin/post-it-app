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
         res.send({ message: 'Welcome to the Post It' });
       }).catch((error) => {
         const errorMessage = error.message;
         res.status(400).send({ message: `Error signing up :( ${errorMessage}` });
       });
    } else {
      // if email or password or username strings are empty
      res.status(400).send({
        message: 'Please make sure you enter all data'
      });
    }
  });
};
