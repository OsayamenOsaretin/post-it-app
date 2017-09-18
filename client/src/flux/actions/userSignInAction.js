import validator from 'validator';
import PostItDispatcher from '../Dispatcher';
import PostItActionTypes from '../ActionTypes';
import { getAuth } from '../firebaseFunctions';


/**
 *userSignInAction - signs in user & dispatches actions to get groups
 * @export
 * @function
 * @returns {void}
 * @param {*} userDetails
 */
export default function SignInAction({ email, password }) {
  const auth = getAuth();

  if (validator.isEmail(email)) {
    auth.signInWithEmailAndPassword(email, password)
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
  } else {
    PostItDispatcher.handleServerAction({
      type: PostItActionTypes.LOGIN_ERROR,
      errorMessage: 'Invalid email address'
    });
  }
}

