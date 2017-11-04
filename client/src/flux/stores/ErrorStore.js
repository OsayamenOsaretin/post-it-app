import { EventEmitter } from 'events';
import Dispatcher from '../Dispatcher';
import ActionTypes from '../ActionTypes';

const CHANGE_EVENT = 'change';

let loginError, registerError, resetPasswordError;

/**
 * ErrorStoreClass handles error display for ui/ux
 * @return {void}
 */
class ErrorStoreClass extends EventEmitter {
  /**
   * addChangeListener
   * @memberof ErrorStoreClass
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
   * @memberof ErrorStoreClass
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
   * @memberof ErrorStoreClass
   */
  getLoginError() {
    return loginError;
  }

  /** getRegistrationError
   * @return {string} registerError
   * 
   * @memberof ErrorStoreClass
   */
  getRegisterError() {
    return registerError;
  }

  /**
   * @returns {String} resetPasswordError
   * 
   * @memberof ErrorStoreClass
   */
  getResetPasswordError() {
    return resetPasswordError;
  }
}

const ErrorStore = new ErrorStoreClass();

Dispatcher.register((payload) => {
  const action = payload.action;

  switch (action.type) {
  case ActionTypes.LOGIN_ERROR:
    loginError = action.errorMessage;
    registerError = undefined;
    ErrorStore.emit(CHANGE_EVENT);
    break;

  case ActionTypes.REGISTER_ERROR:
    registerError = action.errorMessage;
    loginError = undefined;
    ErrorStore.emit(CHANGE_EVENT);
    break;

  case ActionTypes.FAILED_RESET_PASSWORD:
    resetPasswordError = action.message;
    ErrorStore.emit(CHANGE_EVENT);
    break;

  case ActionTypes.RESET_MESSAGE_SENT:
    resetPasswordError = '';
    ErrorStore.emit(CHANGE_EVENT);
    break;

  default:
    return true;
  }
});

export default ErrorStore;
