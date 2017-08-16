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

  /**
   * return requests
   * @return {*} requests
   */
  getRequests() {
    console.log(requests);
    return requests;
  }
}

const requestStore = new PostItRequestStore();

PostItDispatcher.register((payload) => {
  const action = payload.action;

  switch (action.type) {
  case PostItActionTypes.RECEIVE_REQUESTS: {
    console.log('action reaches receive request store');
    console.log(action.requests);
    const requestsMap = new Map(action.requests);
    addNewRequests(requestsMap);
    console.log(requestsMap);
    requestStore.emit(CHANGE_EVENT);
    break;
  }

  case PostItActionTypes.DELETE_REQUEST: {
    console.log('gets to delete action handler');
    const groupId = action.id;
    console.log('this is before delete', requests.size);
    requests = requests.delete(groupId);
    console.log('this is after delete', requests.size);
    requestStore.emit(CHANGE_EVENT);
    break;
  }
  default: {
    return true;
  }
  }
});
export default requestStore;
