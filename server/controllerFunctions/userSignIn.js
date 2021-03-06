// routes to user sign in
import firebase from 'firebase';
import validateEmail from '../utilities/validate_email';

/**
 * sign in controller function
 * @return {void} 
 * @param {*} req
 * @param {*} res
 */
export default function userSignIn(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  if (!validateEmail(email)) {
    res.status(400).send({
      message: 'Something went wrong, Please use a valid email address',
    });
  } else if (password) {
    // sign in with user and email using firebase authentication
    const promise = firebase.auth()
      .signInWithEmailAndPassword(email, password);

    promise.then((user) => {
      res.status(200).send({
        message: 'Welcome User, or Ranger.',
        userData: user
      });
    }).catch(() => {
      res.status(401).send({
        message:
        'Ouch!, Your username or password is incorrect, please try again'
      });
    });
  } else {
    // send error message in case of empty email and password
    res.status(400).send({ message: 'Please fill in your password' });
  }
}
