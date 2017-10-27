// action to sign out user
import request from 'superagent';
import PostItDispatcher from '../Dispatcher';
import PostItActionTypes from '../ActionTypes';

export default () => {
  request
    .get('/signout')
    .end((error) => {
      if (error) {
        PostItDispatcher.handleServerAction({
          type: PostItActionTypes.FAILED_SIGN_OUT
        });
      } else {
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
      }
    });
};
