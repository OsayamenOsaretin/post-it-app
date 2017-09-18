import PostItDispatcher from '../Dispatcher';
import PostItActionTypes from '../ActionTypes';
import { getAuth } from '../firebaseFunctions';


/**
 * Reset password action
 * @export
 * @function
 * @returns {void}
 * @param {*} email
 */
export default function ResetPassword({ resetEmail }) {
  const auth = getAuth();

  auth.sendPasswordResetEmail(resetEmail)
    .then(() => {
      PostItDispatcher.handleServerAction({
        type: PostItActionTypes.RESET_MESSAGE_SENT
      });
    })
    .catch(() => {
      PostItDispatcher.handleServerAction({
        type: PostItActionTypes.FAILED_RESET_PASSWORD
      });
    });
}
