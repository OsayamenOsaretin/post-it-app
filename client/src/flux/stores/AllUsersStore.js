import { EventEmitter } from 'events';
import UserList from '../models/groupList';
import Dispatcher from '../Dispatcher';
import ActionTypes from '../ActionTypes';
import getAllUsersAction from '../actions/getAllUsersAction';


let users = new UserList();

// add new user to list of users
const addNewUsers = (newUserList) => {
  users = users.merge(newUserList);
};

/**
 * PosItAllUsersStore holds Store logic for users
 * @return {void}
 */
class AllUserStore extends EventEmitter {
/**
 * addChangeListener
 * @memberof AllUserStore
 * @param {*} callback
 * @param {*} CHANGE_EVENT_GROUP
 * @return {void}
 */
  addChangeListener(callback, CHANGE_EVENT_GROUP) {
    this.on(CHANGE_EVENT_GROUP, callback);
  }

  /**
 * removeChangeListener
 * @memberof AllUserStore
 * @param {*} callback
 * @param {*} CHANGE_EVENT_GROUP
 * @return {void}
 */
  removeChangeListener(callback, CHANGE_EVENT_GROUP) {
    this.removeListener(CHANGE_EVENT_GROUP, callback);
  }

  /* eslint class-methods-use-this: 0 */

  /**
   * getUsers
   * @memberof AllUserStore
   * @return {Map} users
   * @param {string} groupId
   */
  getUsers(groupId) {
    return users.get(groupId);
  }
}

const allUserStore = new AllUserStore();

Dispatcher.register((payload) => {
  const action = payload.action;
  let groupId;
  let userList;
  let usersForGroup;
  let userId;

  switch (action.type) {
  case ActionTypes.GET_USERS:
    getAllUsersAction();
    break;

  case ActionTypes.RECIEVE_USERS:
    groupId = action.id;
    userList = action.users;
    usersForGroup = users.get(groupId);
    if (usersForGroup) {
      usersForGroup = usersForGroup.merge(new Map(userList));
      const newUserMap = new Map();
      newUserMap.set(groupId, usersForGroup);
      addNewUsers(newUserMap);
    } else {
      const newUserMap = new Map();
      newUserMap.set(groupId, new UserList(userList));
      addNewUsers(newUserMap);
    }
    allUserStore.emit(groupId);
    break;

  case ActionTypes.DELETE_USER:
    userId = action.id;
    groupId = action.groupId;
    usersForGroup = users.get(groupId);
    if (usersForGroup) {
      usersForGroup = usersForGroup.delete(userId);
      const newUsersForGroupMap = new Map();
      newUsersForGroupMap.set(groupId, new UserList(usersForGroup));
      addNewUsers(newUsersForGroupMap);
      allUserStore.emit(groupId);
    }
    break;

  case ActionTypes.CLEAR_USERS_STORE:
    users = new UserList();
    break;

  default:
    return true;
  }
});

export default allUserStore;
