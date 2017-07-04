// route to sign in user using google sign in

module.exports = (app, firebase) => {
  app.post('/user/google/signin', (req, res) => {
    const provider = new firebase.auth().GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
    .then((result) => {
      const token = result.credential.accessToken;
      const userObject = result.user;

      res.send({
        user: userObject,
        accessToken: token
      });
    })
    .catch((error) => {
      res.status(401).send({
        message: `Error signing in: ${error.message}`
      });
    });
  });
};
