import { EventEmitter } from 'events';
import GroupList from '../models/groupList';
import Dispatcher from '../Dispatcher';
import ActionTypes from '../ActionTypes';
import { getGroups, addGroupApi } from '../actions/groupActions';

const CHANGE_EVENT = 'change';

// create empty immutable map to hold group list
let groups = new GroupList();

// add new groups to list of groups
const addNewGroups = (newGroupList) => {
  groups = groups.merge(newGroupList);
};

/**
 * GroupStore holds Store logic for groups
 * @return {void}
 *
 */
class GroupStore extends EventEmitter {
  /**
   * addChangeListener
   * @memberof GroupStore
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
   * @memberof GroupStore
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
   * @memberof GroupStore
   * 
   * @return {Map} groups
   */
  getGroups() {
    return groups;
  }

  /**
   * getGroupUser
   * @memberof GroupStore
   * 
   * @return {List} groupUsers
   * 
   * @param {String} groupId
   */
  getGroup(groupId) {
    return groups.get(groupId);
  }
}

const groupStore = new GroupStore();

Dispatcher.register((payload) => {
  const action = payload.action;
  const source = payload.source;
  let groupMap;


  switch (action.type) {
  case ActionTypes.GET_GROUPS:
    if (source === 'SERVER_ACTION') {
      getGroups();
    }
    break;

  case ActionTypes.ADD_GROUP:
    // make api call to add group name
    addGroupApi(action.groupName);
    break;

  case ActionTypes.RECIEVE_GROUP_RESPONSE:
    groupMap = new Map(action.userGroups);
    addNewGroups(groupMap);
    groupStore.emit(CHANGE_EVENT);
    break;

  case ActionTypes.CLEAR_GROUPS_STORE:
    groups = new GroupList();
    break;

  default:
    return true;
  }
});
export default groupStore;

