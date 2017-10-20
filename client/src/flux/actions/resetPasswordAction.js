import PostItDispatcher from '../Dispatcher';
import PostItActionTypes from '../ActionTypes';
import { getAuth } from '../firebaseFunctions';


/**
 * Reset password action
 * @export
 * @function
 * 
 * @param {*} email
 * 
 * @returns {void}
 */
export default function ResetPassword({ email }) {
  const auth = getAuth();

  return auth.sendPasswordResetEmail(email)
    .then(() => {
      PostItDispatcher.handleServerAction({
        type: PostItActionTypes.RESET_MESSAGE_SENT
      });
    })
    .catch((error) => {
      const errorMessage =
        error.code === 'auth/user-not-found' ? 'Oops! Incorrect email' : '';
      PostItDispatcher.handleServerAction({
        type: PostItActionTypes.FAILED_RESET_PASSWORD,
        message: errorMessage
      });
    });
}
