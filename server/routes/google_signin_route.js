// route to sign in user using google sign in

module.exports = (app, firebase) => {
  app.post('/user/google/signin', (req, res) => {
    const idToken = req.body.idToken;

    const credential = firebase.auth.GoogleAuthProvider.credential(idToken);

    firebase.auth().signInWithCredential(credential)
    .then((user) => {
      res.send({
        userObject: user
      });
    })
    .catch((error) => {
      res.status(401).send({
        message: `Error signing in: ${error.message}`
      });
    });
  });
};
