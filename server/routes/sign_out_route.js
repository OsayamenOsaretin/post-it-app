// route leads to a sign out

module.exports = (app, firebase) => {
  app.get('/signout', (req, res) => {
    firebase.auth().signOut().then(() => {
      res.send({
        message: 'You are successfully signed out'
      });
    }).catch((error) => {
      res.status(405).send({
        message: `Sorry, ${error.message}. please try to sign out again`
      });
    });
  });
};
