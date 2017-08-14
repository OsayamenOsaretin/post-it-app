import PostItDispatcher from '../PostItDispatcher';
import PostItActionTypes from '../PostItActionTypes';

export default (newRequests) => {
  console.log('receive requests action called');
  PostItDispatcher.handleServerAction({
    types: PostItActionTypes.RECEIVE_REQUESTS,
    requests: newRequests
  });
};
