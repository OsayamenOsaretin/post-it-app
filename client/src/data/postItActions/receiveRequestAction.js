import PostItDispatcher from '../PostItDispatcher';
import PostItActionTypes from '../PostItActionTypes';

export default (newRequests) => {
  PostItDispatcher.handleServerAction({
    type: PostItActionTypes.RECEIVE_REQUESTS,
    requests: newRequests
  });
};
