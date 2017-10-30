import { EventEmitter } from 'events';
import Dispatcher from '../Dispatcher';
import ActionTypes from '../ActionTypes';

const CHANGE_EVENT = 'change';

let loginError, registerError, resetPasswordError;

/**
 * ErrorStore handles error display for ui/ux
 * @return {void}
 */
class ErrorStore extends EventEmitter {

  /**
   * addChangeListener
   * @memberof ErrorStore
   * 
   * @param {Function} callback
   * 
   * @return {void}
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  /**
   * removeChangeListener
   * @memberof ErrorStore
   * 
   * @param {Function} callback
   * 
   * @return {void}
   */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  /* eslint class-methods-use-this: 0 */

  /** getLoginError
   * @return {string} loginError
   * 
   * @memberof ErrorStore
   */
  getLoginError() {
    return loginError;
  }

  /** getRegistrationError
   * @return {string} registerError
   * 
   * @memberof ErrorStore
   */
  getRegisterError() {
    return registerError;
  }

  /**
   * @returns {String} resetPasswordError
   * 
   * @memberof ErrorStore
   */
  getResetPasswordError() {
    return resetPasswordError;
  }
}

const errorStore = new ErrorStore();

Dispatcher.register((payload) => {
  const action = payload.action;

  switch (action.type) {
  case ActionTypes.LOGIN_ERROR:
    loginError = action.errorMessage;
    registerError = undefined;
    errorStore.emit(CHANGE_EVENT);
    break;

  case ActionTypes.REGISTER_ERROR:
    registerError = action.errorMessage;
    loginError = undefined;
    errorStore.emit(CHANGE_EVENT);
    break;

  case ActionTypes.FAILED_RESET_PASSWORD:
    resetPasswordError = action.message;
    errorStore.emit(CHANGE_EVENT);
    break;

  case ActionTypes.RESET_MESSAGE_SENT:
    resetPasswordError = '';
    errorStore.emit(CHANGE_EVENT);
    break;

  default:
    return true;
  }
});

export default errorStore;
