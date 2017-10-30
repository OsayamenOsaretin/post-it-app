import { EventEmitter } from 'events';
import Dispatcher from '../Dispatcher';
import ActionTypes from '../ActionTypes';

/* global localStorage */
const CHANGE_EVENT = 'change';

let passwordResetMessageState = false;

const checkDateDiff = (firstDate, secondDate) => {
  const timeDiff = Math.abs(secondDate.getTime() - firstDate.getTime());
  const diffInDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return diffInDays;
};

/**
 * UserStore manages state for the signed in user
 */
class UserStore extends EventEmitter {
  /**
   * Adds changeListener
   * @param {Function} callback
   * 
   * @return {void}
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  /**
   * Removes changeListener
   * @memberof UserStore
   * 
   * @param {Function} callback
   * 
   * @return {void}
   */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  /* eslint class-methods-use-this: 0 */

  /**
   * returns sign in state of the user;
   * @return {boolean} signedInState
   * 
   * @memberof UserStore
   */
  getSignedInState() {
    const signinDate = new Date(localStorage.getItem('login_date'));
    const token = localStorage.getItem('token');
    const now = new Date();
    if (signinDate && token) {
      return checkDateDiff(signinDate, now) <= 3 ?
        token : 'expired';
    }
    if (!signinDate) {
      return 'expired';
    }
  }

  /**
   * returns password reset state
   * @returns {bool} passwordResetMessageState
   * 
   * @memberof UserStore
   */
  getPasswordResetMessageState() {
    return passwordResetMessageState;
  }
}

const userStore = new UserStore();

Dispatcher.register((payload) => {
  const action = payload.action;
  const source = payload.source;


  switch (action.type) {
  case ActionTypes.LOGIN_USER:
    if (source === 'SERVER_ACTION') {
      const user = action.user;
      const displayName = user.displayName;
      const userId = user.uid;
      const date = new Date();
      localStorage.setItem('token', displayName);
      localStorage.setItem('username', displayName);
      localStorage.setItem('userId', userId);
      localStorage.setItem('login_date', date);
      userStore.emit(CHANGE_EVENT);
    }
    break;

  case ActionTypes.RESET_MESSAGE_SENT:
    passwordResetMessageState = true;
    userStore.emit(CHANGE_EVENT);
    break;


  case ActionTypes.SIGN_OUT:
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('login_date');
    localStorage.removeItem('userId');
    userStore.emit(CHANGE_EVENT);
    break;

  default:
    return true;
  }
});

export default userStore;

