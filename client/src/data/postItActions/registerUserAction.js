import validator from 'validator';
import PostItActionTypes from '../PostItActionTypes';
import PostItDispatcher from '../PostItDispatcher';
import { getAuth, getDatabase } from '../firebaseFunctions';


/**
 *registerUserAction - registers a new user and dispatches to Log in user
 * @export
 * @function
 * @returns {void}
 * @param {newUserDetails} newUserDetails
 */
export default ({ email, password, userName, phone }) => {
  const database = getDatabase();
  const auth = getAuth();

  if (validator.isEmail(email)) {
    if (validator.isLength(password, { max: 100, min: 6 })) {
      if (userName) {
        auth.createUserWithEmailAndPassword(email, password)
          .then((user) => {
            user.updateProfile({
              displayName: userName
            });

            database.ref(`users/${user.uid}`).set({
              username: userName,
              email: user.email,
              number: phone });

            user.sendEmailVerification().then(() => {
              const userData = user;
              PostItDispatcher.handleServerAction({
                type: PostItActionTypes.LOGIN_USER,
                user: userData
              });
            });
          });
      } else {
        PostItDispatcher.handleServerAction({
          type: PostItActionTypes.REGISTER_ERROR,
          errorMessage: 'Invalid Username, please enter a username'
        });
      }
    } else {
      PostItDispatcher.handleServerAction({
        type: PostItActionTypes.REGISTER_ERROR,
        errorMessage:
          'Invalid password, please a password greater than 6 characters'
      });
    }
  } else {
    PostItDispatcher.handleServerAction({
      type: PostItActionTypes.REGISTER_ERROR,
      errorMessage: 'Invalid email, please enter your actual email'
    });
  }
};

