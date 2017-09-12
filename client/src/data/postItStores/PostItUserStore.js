import { EventEmitter } from 'events';
import PostItDispatcher from '../PostItDispatcher';
import PostItActionTypes from '../PostItActionTypes';

/* global localStorage */
const CHANGE_EVENT = 'change';

let passwordResetMessageState = false;

/**
 * PostItUserStore manages state for the signed in user
 */
class PostItUserStore extends EventEmitter {
  /**
   * Adds changeListener
   * @return {void}
   * @param {*} callback
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  /**
   * Removes changeListener
   * @memberof PostItUserStore
   * @return {void}
   * @param {*} callback
   */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  /* eslint class-methods-use-this: 0 */

  /**
   * returns sign in state of the user;
   * @return {boolean} signedInState
   * @memberof PostItUserStore
   */
  getSignedInState() {
    return localStorage.getItem('token');
  }

  /**
   * 
   * returns password reset state
   * @returns {bool} passwordResetMessageState
   * @memberof PostItUserStore
   */
  getPasswordResetMessageState() {
    return passwordResetMessageState;
  }
}

const userStore = new PostItUserStore();

PostItDispatcher.register((payload) => {
  const action = payload.action;
  const source = payload.source;


  switch (action.type) {
  case PostItActionTypes.LOGIN_USER:
    if (source === 'SERVER_ACTION') {
      const user = action.user;
      const displayName = user.displayName;
      const userId = user.uid;
      let token;
      user.getIdToken()
        .then((accessToken) => {
          token = accessToken;
        });
      localStorage.setItem('token', token);
      localStorage.setItem('username', displayName);
      localStorage.setItem('userId', userId);
      userStore.emit(CHANGE_EVENT);
    }
    break;

  case PostItActionTypes.RESET_MESSAGE_SENT:
    passwordResetMessageState = true;
    userStore.emit(CHANGE_EVENT);
    break;


  case PostItActionTypes.SIGN_OUT:
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    userStore.emit(CHANGE_EVENT);
    break;

  default:
    return true;
  }
});

export default userStore;

