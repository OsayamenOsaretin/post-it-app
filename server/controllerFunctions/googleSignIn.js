// route to sign in user using google sign in
import firebase from 'firebase';

/**
 * controller function for google sign in
 * @return {void}
 * @param {*} req
 * @param {*} res
 */
export default function googleSignIn(req, res) {
  const idToken = req.body.idToken;
  const db = firebase.database();

  const credential = firebase.auth.GoogleAuthProvider.credential(idToken);

  firebase.auth().signInWithCredential(credential)
    .then((user) => {
      // save the user details to the database
      db.ref(`users/${user.uid}`).set({
        username: user.displayName,
        email: user.email
      })
        .catch((error) => {
          res.status(500).send({
            message: error.message
          });
        });

      res.send({
        userObject: user,
        message: 'user signed in'
      });
    })
    .catch((error) => {
      res.status(401).send({
        message: `Error signin in: ${error.message}`
      });
    });
}

