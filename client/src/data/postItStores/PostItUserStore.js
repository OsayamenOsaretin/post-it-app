import { EventEmitter } from 'events';
import PostItDispatcher from '../PostItDispatcher';
import PostItActionTypes from '../PostItActionTypes';

const CHANGE_EVENT = 'change';

const signedIn = localStorage.getItem('token');

/**
 * PostItUserStore helps managed the signed in state of users
 */
class PostItUserStore extends EventEmitter {

/**
 * UserStore change listener
 * @return {void}
 * @param {*} callback
 */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

/**
 * UserStore change listener
 * @return {void}
 * @param {*} callback
 */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

/**
 * returns token signifying signed in state of user
 * @return {String} signedIn
 */
  getSignedInState() {
    return signedIn;
  }
}

const userStore = new PostItUserStore();

PostItDispatcher.register((payload) => {
  const action = payload.action;

  switch (action.type) {
  case PostItActionTypes.LOGIN_USER: {
    console.log('gets to user store');
    const token = action.user.stsTokenManager.accessToken;
    localStorage.setItem('token', token);
    userStore.emit(CHANGE_EVENT);
    break;
  }
  default: {
    return true;
  }
  }
});

module.exports = userStore;
