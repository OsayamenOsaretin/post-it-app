// action to sign out user
import PostItDispatcher from '../PostItDispatcher';
import PostItActionTypes from '../PostItActionTypes';
import { getAuth } from '../firebaseFunctions';

export default () => {
  const auth = getAuth();
  auth.signOut()
    .then(() => {
      PostItDispatcher.handleServerAction({
        type: PostItActionTypes.SIGN_OUT
      });
      PostItDispatcher.handleServerAction({
        type: PostItActionTypes.CLEAR_USER_STORE
      });
      PostItDispatcher.handleServerAction({
        type: PostItActionTypes.CLEAR_USERS_STORE
      });
      PostItDispatcher.handleServerAction({
        type: PostItActionTypes.CLEAR_MESSAGES_STORE
      });
      PostItDispatcher.handleServerAction({
        type: PostItActionTypes.CLEAR_GROUPS_STORE
      });
      PostItDispatcher.handleServerAction({
        type: PostItActionTypes.CLEAR_GROUP_REQUEST_STORE
      });
    })
    .catch(() => {
      PostItDispatcher.handleServerAction({
        type: PostItActionTypes.FAILED_SIGN_OUT
      });
    });
};
