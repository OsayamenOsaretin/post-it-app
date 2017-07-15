// action to sign out user
import request from 'superagent';
import PostItDispatcher from '../PostItDispatcher';
import PostItActionTypes from '../PostItActionTypes';

export default () => {
  request
  .get('/signout')
  .end((error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log(result);
      PostItDispatcher.handleServerAction({
        type: PostItActionTypes.SIGN_OUT
      });
    }
  });
};
