import { EventEmitter } from 'events';
import UserList from '../models/groupList';
import PostItDispatcher from '../PostItDispatcher';
import PostItActionTypes from '../PostItActionTypes';
import getAllUsersAction from '../postItActions/getAllUsersAction';

const CHANGE_EVENT = 'change';

let users = new UserList();

// add new user to list of users
const addNewUsers = (newUserList) => {
  console.log(newUserList);
  users = users.merge(newUserList);
};

/**
 * PosItAllUsersStore holds Store logic for users
 * @return {void}
 */
class PostItAllUserStore extends EventEmitter {
  /**
 * addChangeListener
 * @memberof PostItAllUserStore
 * @param {*} callback
 * @return {void}
 */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  /**
 * removeChangeListener
 * @memberof PostItAllUserStore
 * @param {*} callback
 * @return {void}
 */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

/**
 * getUsers
 * @memberof PostItAllUserStore
 * @return {Map} users
 */
  getUsers() {
    console.log('asks for groups');
    console.log('and gets...');
    console.log(users);
    return users;
  }
}

const allUserStore = new PostItAllUserStore();

PostItDispatcher.register((payload) => {
  const action = payload.action;

  switch (action.type) {
  case PostItActionTypes.GET_USERS: {
    console.log('gets to get all users store');
    getAllUsersAction();
    break;
  }

  case PostItActionTypes.RECIEVE_USERS: {
    const userMap = new Map(action.users);
    addNewUsers(userMap);
    allUserStore.emit(CHANGE_EVENT);
    break;
  }

  default: {
    return true;
  }
  }
});

module.exports = allUserStore;
