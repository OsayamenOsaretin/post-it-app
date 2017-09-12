// route to reset password
import firebase from 'firebase';

/**
 * resetPassword controller
 * @return {void}
 * @param {*} req
 * @param {*} res
 */
export default function resetPassword(req, res) {
  const email = req.body.email;

  firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      res.send({
        message: 'reset email sent!'
      });
    })
    .catch((error) => {
      res.status(401).send({
        message: `Error resetting password: ${error.message}`
      });
    });
}

