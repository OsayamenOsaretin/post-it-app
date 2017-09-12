import { EventEmitter } from 'events';
import PostItDispatcher from '../PostItDispatcher';
import PostItActionTypes from '../PostItActionTypes';

const CHANGE_EVENT = 'change';

let loginError, registerError;

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

  /* eslint class-methods-use-this: 0 */

  /** getLoginError
   * @return {string} loginError
   * @memberof PostItErrorStore
   */
  getLoginError() {
    return loginError;
  }

  /** getRegistrationError
   * @return {string} registerError
   * @memberof PostItErrorStore
   */
  getRegisterError() {
    return registerError;
  }
}

const errorStore = new PostItErrorStore();

PostItDispatcher.register((payload) => {
  const action = payload.action;

  switch (action.type) {
  case PostItActionTypes.LOGIN_ERROR:
    loginError = action.errorMessage;
    registerError = undefined;
    errorStore.emit(CHANGE_EVENT);
    break;

  case PostItActionTypes.REGISTER_ERROR:
    registerError = action.errorMessage;
    loginError = undefined;
    errorStore.emit(CHANGE_EVENT);
    break;

  default:
    return true;
  }
});

export default errorStore;
