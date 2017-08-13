import PostItDispatcher from '../PostItDispatcher';
import PostItActionTypes from '../PostItActionTypes';

export default (newRequests) => {
  PostItDispatcher.handleServerAction({
    types: PostItActionTypes.RECEIVE_REQUESTS,
    requests: newRequests
  });
};
