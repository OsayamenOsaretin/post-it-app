// route to reset password

module.exports = (app, firebase) => {
  app.post('/user/reset-password', (req, res) => {
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
  });
};
