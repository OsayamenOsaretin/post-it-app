// routes to user sign-up
import validateEmail from '../utilities/validate_email';

module.exports = (app, firebase) => {
  app.post('/user/signup', (req, res) => {
    // perfom user signup here
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;

    if (!validateEmail(email)) {
      res.status(400).send({
        message: 'Please use a valid email address',
      });
    } else if (userName && password) {
      // create user with email and password
      firebase.auth().createUserWithEmailAndPassword(email, password)
       .then((user) => {
         // update the username of the user
         user.updateProfile({
           displayName: userName,
         });
         user.sendEmailVerification().then(() => {
           res.send({ message: 'Welcome to the Post It, An email has been sent to you' });
         });
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
