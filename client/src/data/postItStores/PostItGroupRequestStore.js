import { EventEmitter } from 'events';
import PostItActionTypes from '../PostItActionTypes';
import PostItDispatcher from '../PostItDispatcher';
import RequestList from '../models/groupList';

const CHANGE_EVENT = 'requestChange';

let requests = new RequestList();

const addNewRequests = (newRequestList) => {
  requests = requests.merge(newRequestList);
};

/**
 * PostItRequestStore holds Store logic for groups
 * @return {void}
 *
 */
class PostItRequestStore extends EventEmitter {
  /**
   * addChangeListener
   * @memberof PostItRequestStore
   * @param {*} callback
   * @return {void}
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  /**
   * removeChangeListener
   * @memberof PostItRequestStore
   * @param {*} callback
   * @return {void}
   */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  /* eslint class-methods-use-this: 0 */

  /**
   * return requests
   * @return {*} requests
   */
  getRequests() {
    return requests;
  }
}

const requestStore = new PostItRequestStore();

PostItDispatcher.register((payload) => {
  const action = payload.action;
  let groupId;
  let requestsMap;

  switch (action.type) {
  case PostItActionTypes.RECEIVE_REQUESTS:
    requestsMap = new Map(action.requests);
    addNewRequests(requestsMap);
    requestStore.emit(CHANGE_EVENT);
    break;

  case PostItActionTypes.DELETE_REQUEST:
    groupId = action.id;
    requests = requests.delete(groupId);
    requestStore.emit(CHANGE_EVENT);
    break;

  case PostItActionTypes.CLEAR_GROUP_REQUEST_STORE:
    requests = new RequestList();
    break;

  default:
    return true;
  }
});
export default requestStore;
