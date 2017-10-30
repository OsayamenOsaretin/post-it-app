import PostItDispatcher from '../Dispatcher';
import PostItActionTypes from '../ActionTypes';

export default (newRequests) => {
  PostItDispatcher.handleServerAction({
    type: PostItActionTypes.RECEIVE_REQUESTS,
    requests: newRequests
  });
};
