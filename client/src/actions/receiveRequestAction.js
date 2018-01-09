import PostItDispatcher from '../Dispatcher';
import PostItActionTypes from '../ActionTypes';

/**
 *@param {Map} newRequests
 *
 *@returns {void}
 */
export default (newRequests) => {
  PostItDispatcher.handleServerAction({
    type: PostItActionTypes.RECEIVE_REQUESTS,
    requests: newRequests
  });
};
