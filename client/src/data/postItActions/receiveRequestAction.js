import PostItDispatcher from '../PostItDispatcher';
import PostItActionTypes from '../PostItActionTypes';

export default (newRequests) => {
  console.log('receive requests action called');
  PostItDispatcher.handleServerAction({
    type: PostItActionTypes.RECEIVE_REQUESTS,
    requests: newRequests
  });
};
