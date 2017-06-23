import { EventEmitter } from 'events';
import PostItDispatcher from '../PostItDispatcher';
import PostItActionTypes from '../PostItActionTypes';

const CHANGE_EVENT = 'change';

const signedInState = localStorage.getItem('token');

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
    return signedInState;
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
      console.log(user.displayName);
      console.log('gets to the login server source action');
      userStore.emit(CHANGE_EVENT);
    }
    break;
  }

  default: {
    return true;
  }
  }
});

module.exports = userStore;

