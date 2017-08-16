// action to sign out user
import request from 'superagent';
import PostItDispatcher from '../PostItDispatcher';
import PostItActionTypes from '../PostItActionTypes';

export default () => {
  request
    .get('/signout')
    .end((error, result) => {
      if (error) {
        PostItDispatcher.handleServerAction({
          type: PostItActionTypes.FAILED_SIGN_OUT
        });
      } else {
        PostItDispatcher.handleServerAction({
          type: PostItActionTypes.SIGN_OUT
        });
      }
    });
};
