import { EventEmitter } from 'events';
import PostItActionTypes from '../PostItActionTypes';
import PostItDispatcher from '../PostItDispatcher';
import RequestList from '../models/groupList';

const CHANGE_EVENT = 'change';

let requests = new RequestList();

const addNewRequests = (newRequestList) => {
  requests.merge(newRequestList);
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
}

const requestStore = new PostItRequestStore();
module.exports = requestStore;
