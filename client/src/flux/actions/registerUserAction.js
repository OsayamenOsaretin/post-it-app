import validator from 'validator';
import PostItActionTypes from '../ActionTypes';
import PostItDispatcher from '../Dispatcher';
import { getAuth, getDatabase } from '../firebaseHelpers';
import friendlyErrorHelper from '../../utility/friendlyErrorHelper';

/**
 * helper function to promisify error handling
 * @param {String} errorMessage 
 * 
 * @return {Promise} resolved Promise 
 */
const handleError = errorMessage => (
  Promise.resolve()
    .then(() => {
      PostItDispatcher.handleServerAction({
        type: PostItActionTypes.REGISTER_ERROR,
        errorMessage
      });
    })
);

/**
 *registerUserAction - registers a new user and dispatches to Log in user
 * @export
 * @function
 * 
 * @returns {void}
 * 
 * @param {newUserDetails} newUserDetails
 */
export default ({ email, password, userName, phone }) => {
  const database = getDatabase();
  const auth = getAuth();
  let errorMessage;

  if (!validator.isAlphanumeric(userName)) {
    errorMessage = 'Invalid Username, please enter a valid username';
    return handleError(errorMessage);
  }

  if (!validator.isEmail(email)) {
    errorMessage = 'Invalid email, please enter your actual email';
    return handleError(errorMessage);
  }

  if (!validator.isLength(password, { max: 100, min: 6 })) {
    errorMessage =
      'Invalid password, please use a password longer than 6 characters';
    return handleError(errorMessage);
  }


  return auth.createUserWithEmailAndPassword(email, password)
    .then((user) => {
      user.updateProfile({
        displayName: userName
      }).then(() => {
        PostItDispatcher.handleServerAction({
          type: PostItActionTypes.LOGIN_USER,
          user
        });
      });

      database.ref(`users/${user.uid}`).set({
        username: userName,
        email,
        number: phone });
    }).catch((error) => {
      errorMessage = friendlyErrorHelper(error);
      PostItDispatcher.handleServerAction({
        type: PostItActionTypes.REGISTER_ERROR,
        errorMessage
      });
    });
};

