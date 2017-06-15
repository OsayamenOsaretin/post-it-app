// routes to user sign in
import validateEmail from '../utilities/validate_email';

module.exports = (app, firebase) => {
  app.post('/user/signin', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email);

    if (!validateEmail(email)) {
      res.status(500).send({
        message: 'Please use a valid email address',
      });
    } else if (password) {
      // sign in with user and email using firebase authentication
      firebase.auth().signInWithEmailAndPassword(email, password).then((userObject) => {
        res.status(200).send({
          message: 'Welcome User, or Ranger.',
          user: userObject
        });
      }).catch((error) => {
        const errorMessage = error.message;
        res.status(401).send({
          message: `Error signing in :( : ${errorMessage}`
        });
      });
    } else {
      // send error message in case of empty email and password
      res.status(400).send({ message: 'Please fill in your password' });
    }
  });
};
