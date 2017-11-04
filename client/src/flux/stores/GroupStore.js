import { EventEmitter } from 'events';
import GroupList from '../models/groupList';
import Dispatcher from '../Dispatcher';
import ActionTypes from '../ActionTypes';

const CHANGE_EVENT = 'change';

// create empty immutable map to hold group list
let groups = new GroupList();

// add new groups to list of groups
const addNewGroups = (newGroupList) => {
  groups = groups.merge(newGroupList);
};

/**
 * GroupStoreClass holds Store logic for groups
 * @return {void}
 *
 */
class GroupStoreClass extends EventEmitter {
  /**
   * addChangeListener
   * @memberof GroupStoreClass
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
   * @memberof GroupStoreClass
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
   * getGroups
   * @memberof GroupStoreClass
   * 
   * @return {Map} groups
   */
  getGroups() {
    return groups;
  }

  /**
   * getGroupUser
   * @memberof GroupStoreClass
   * 
   * @return {List} groupUsers
   * 
   * @param {String} groupId
   */
  getGroup(groupId) {
    return groups.get(groupId);
  }
}

const GroupStore = new GroupStoreClass();

Dispatcher.register((payload) => {
  const action = payload.action;
  let groupMap;


  switch (action.type) {
  case ActionTypes.RECIEVE_GROUP_RESPONSE:
    groupMap = new Map(action.userGroups);
    addNewGroups(groupMap);
    GroupStore.emit(CHANGE_EVENT);
    break;

  case ActionTypes.CLEAR_GROUPS_STORE:
    groups = new GroupList();
    break;

  default:
    return true;
  }
});
export default GroupStore;

