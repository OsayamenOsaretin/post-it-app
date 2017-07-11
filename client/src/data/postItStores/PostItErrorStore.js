import { EventEmitter } from 'events';
import PostItDispatcher from '../PostItDispatcher';
import PostItActionTypes from '../PostItActionTypes';

const CHANGE_EVENT = 'change';

let loginError;

/**
 * PostItErrorStore handles error display for ui/ux
 * @return {void}
 */
class PostItErrorStore extends EventEmitter {

  /**
   * addChangeListener
   * @memberof PostItErrorStore
   * @param {*} callback
   * @return {void}
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  /**
   * removeChangeListener
   * @memberof PostItErrorStore
   * @param {*} callback
   * @return {void}
   */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  /** getLoginError
   * @return {string} loginError
   * @memberof PostItErrorStore
   */
  getLoginError() {
    return loginError;
  }
}

const errorStore = new PostItErrorStore();

PostItDispatcher.register((payload) => {
  const action = payload.action;

  switch (action.type) {
  case PostItActionTypes.LOGIN_ERROR: {
    loginError = action.errorMessage;
    errorStore.emit(CHANGE_EVENT);
    break;
  }

  default: {
    return true;
  }
  }
});

module.exports = errorStore;
