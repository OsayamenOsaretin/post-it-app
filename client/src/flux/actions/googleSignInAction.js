import PostItDispatcher from '../Dispatcher';
import PostItActionTypes from '../ActionTypes';
import { getAuth, getDatabase, googleProvider } from '../firebaseFunctions';


/**
 *userSignInAction - signs in user & dispatches actions to get groups
 * @export
 * @function
 * @returns {void}
 */
export default function GoogleSignInAction() {
  const auth = getAuth();
  const database = getDatabase();
  return auth.signInWithPopup(googleProvider)
    .then((result) => {
      const user = result.user;
      // save the user details to the database
      database.ref(`users/${user.uid}`).set({
        username: user.displayName,
        email: user.email
      })
        .catch(() => {
          PostItDispatcher.handleServerAction({
            type: PostItActionTypes.FAILED_GOOGLE_LOGIN
          });
          return false;
        });
      PostItDispatcher.handleServerAction({
        type: PostItActionTypes.LOGIN_USER,
        user
      });
    })
    .catch(() => {
      PostItDispatcher.handleServerAction({
        type: PostItActionTypes.FAILED_GOOGLE_LOGIN
      });
    });
}
