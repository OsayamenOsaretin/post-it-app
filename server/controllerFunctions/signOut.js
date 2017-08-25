// route leads to a sign out
import firebase from 'firebase';

/**
 * sign out controller function
 * @return {void}
 * @param {*} req
 * @param {*} res
 */
export default function signOut(req, res) {
  firebase.auth().signOut().then(() => {
    res.send({
      message: 'You are successfully signed out'
    });
  }).catch((error) => {
    res.status(405).send({
      message: `Sorry, ${error.message}. please try to sign out again`
    });
  });
}
