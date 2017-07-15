import { EventEmitter } from 'events';
import PostItDispatcher from '../PostItDispatcher';
import PostItActionTypes from '../PostItActionTypes';

/* global localStorage */
const CHANGE_EVENT = 'change';

const signedInState = localStorage.getItem('token');

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

  /**
   * returns sign in state of the user;
   * @return {boolean} signedInState
   * @memberof PostItUserStore
   */
  getSignedInState() {
    console.log(signedInState);
    return localStorage.getItem('token');
  }

  getPasswordResetMessageState() {
    return passwordResetMessageState;
  }
}

const userStore = new PostItUserStore();

PostItDispatcher.register((payload) => {
  const action = payload.action;
  const source = payload.source;

  console.log('gets to user store');

  switch (action.type) {
  case PostItActionTypes.LOGIN_USER: {
    if (source === 'SERVER_ACTION') {
      const user = action.user;
      const token = user.stsTokenManager.accessToken;
      localStorage.setItem('token', token);
      localStorage.setItem('username', user.displayName);
      userStore.emit(CHANGE_EVENT);
    }
    break;
  }

  case PostItActionTypes.RESET_MESSAGE_SENT: {
    passwordResetMessageState = true;
    userStore.emit(CHANGE_EVENT);
    break;
  }

  case PostItActionTypes.SIGN_OUT: {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    userStore.emit(CHANGE_EVENT);

    break;
  }

  default: {
    return true;
  }
  }
});

module.exports = userStore;

