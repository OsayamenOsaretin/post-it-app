import validator from 'validator';
import PostItDispatcher from '../Dispatcher';
import PostItActionTypes from '../ActionTypes';
import { getAuth } from '../firebaseFunctions';


/**
 *userSignInAction - signs in user & dispatches actions to get groups
 * @export
 * @function
 * 
 * @param {String} email
 * @param {String} password
 * 
 * @returns {void}
 */
export default function SignInAction({ email, password }) {
  const auth = getAuth();

  if (validator.isEmail(email)) {
    return auth.signInWithEmailAndPassword(email, password)
      .then((userData) => {
        PostItDispatcher.handleServerAction({
          type: PostItActionTypes.LOGIN_USER,
          user: userData
        });
      })
      .catch(() => {
        PostItDispatcher.handleServerAction({
          type: PostItActionTypes.LOGIN_ERROR,
          errorMessage:
            'Ouch!, Your username or password is incorrect, please try again'
        });
      });
  }
  PostItDispatcher.handleServerAction({
    type: PostItActionTypes.LOGIN_ERROR,
    errorMessage: 'Invalid email address'
  });
}

