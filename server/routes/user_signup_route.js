// routes to user sign-up
import validateEmail from '../utilities/validate_email';

module.exports = (app, firebase) => {
  app.post('/user/signup', (req, res) => {
    // perfom user signup here
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;
    const db = firebase.database();

    if (!validateEmail(email)) {
      res.status(400).send({
        message: 'Something went wrong, Please use a valid email address',
      });
    } else if (userName && password) {
      // create user with email and password
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
          // update the username of the user
          user.updateProfile({
            displayName: userName,
          });

          // save the user details to the database
          db.ref(`users/${user.uid}`).set({
            username: userName,
            email: user.email
          });

          // send verification email to user
          user.sendEmailVerification().then(() => {
            res.send({
              message: 'Welcome to the Post It, An email has been sent to you',
              userData: user
            });
          });
        }).catch((error) => {
          const errorMessage = error.message;
          res.status(500).send({ message: errorMessage });
        });
    } else {
      // if email or password or username strings are empty
      res.status(422).send({
        message: 'Please make sure you enter all data'
      });
    }
  });
};
