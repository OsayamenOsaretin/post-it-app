// routes to user sign-up

// require firebase to create user
const firebase = require('firebase');

const auth = firebase.auth();

module.exports = function (app) {
  app.post('/user/signup', (req, res) => {
    // perfom user signup here
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;
    auth.createUserWithEmailAndPassword(email, password).then((user) => {
      user.updateProfile({
        displayName: userName,
      }).then(() => {
        // console.log('Username updated successfully');
      });
      res.send({ message: 'Sign up Successful!' });
    }).catch(() => {
      res.send({ message: 'Error signing up :(' });
    });
  });
};
