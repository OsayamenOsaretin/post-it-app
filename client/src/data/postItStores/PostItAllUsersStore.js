import { EventEmitter } from 'events';
import UserList from '../models/groupList';
import PostItDispatcher from '../PostItDispatcher';
import PostItActionTypes from '../PostItActionTypes';
import getAllUsersAction from '../postItActions/getAllUsersAction';

// const CHANGE_EVENT = 'change';

let users = new UserList();

// add new user to list of users
const addNewUsers = (newUserList) => {
  // console.log(newUserList);
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
 * @param {*} CHANGE_EVENT_GROUP
 * @return {void}
 */
  addChangeListener(callback, CHANGE_EVENT_GROUP) {
    this.on(CHANGE_EVENT_GROUP, callback);
  }

/**
 * removeChangeListener
 * @memberof PostItAllUserStore
 * @param {*} callback
 * @param {*} CHANGE_EVENT_GROUP
 * @return {void}
 */
  removeChangeListener(callback, CHANGE_EVENT_GROUP) {
    this.removeListener(CHANGE_EVENT_GROUP, callback);
  }

  /**
 * getUsers
 * @memberof PostItAllUserStore
 * @return {Map} users
 * @param {string} groupId
 */
  getUsers(groupId) {
    console.log('asks for users');
    console.log('and gets...');
    console.log(users.get(groupId));
    return users.get(groupId);
  }
}

const allUserStore = new PostItAllUserStore();

PostItDispatcher.register((payload) => {
  const action = payload.action;

  switch (action.type) {
  case PostItActionTypes.GET_USERS: {
    // console.log('gets to get all users store');
    getAllUsersAction();
    break;
  }

  case PostItActionTypes.RECIEVE_USERS: {
    const groupId = action.id;
    const userList = action.users;

    let usersForGroup = users.get(groupId);
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
    // console.log(users);
    allUserStore.emit(groupId);
    break;
  }

  case PostItActionTypes.DELETE_USER: {
    console.log('gets to delete user action');
    const userId = action.id;
    const groupId = action.groupId;

    console.log(`Users Store get group map: ${users.get(groupId)}`);
    let usersForGroup = users.get(groupId);
    if (usersForGroup) {
      usersForGroup = usersForGroup.delete(userId);
      // console.log(`Users Store map after delete: ${usersForGroup}`);
      const newUsersForGroupMap = new Map();
      newUsersForGroupMap.set(groupId, usersForGroup);
      addNewUsers(newUsersForGroupMap);
      allUserStore.emit(groupId);
    }
    // console.log(users);
    break;
  }

  default: {
    return true;
  }
  }
});

export default allUserStore;
