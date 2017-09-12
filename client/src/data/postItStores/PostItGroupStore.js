import { EventEmitter } from 'events';
import GroupList from '../models/groupList';
import PostItDispatcher from '../PostItDispatcher';
import PostItActionTypes from '../PostItActionTypes';
import { getGroups, addGroupApi } from '../postItActions/groupActions';

const CHANGE_EVENT = 'change';

// create empty immutable map to hold group list
let groups = new GroupList();

// add new groups to list of groups
const addNewGroups = (newGroupList) => {
  groups = groups.merge(newGroupList);
};

/**
 * PostItGroupStore holds Store logic for groups
 * @return {void}
 *
 */
class PostItGroupStore extends EventEmitter {
  /**
   * addChangeListener
   * @memberof PostItGroupStore
   * @param {*} callback
   * @return {void}
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  /**
   * removeChangeListener
   * @memberof PostItGroupStore
   * @param {*} callback
   * @return {void}
   */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
  /* eslint class-methods-use-this: 0 */

  /**
   * getGroups
   * @memberof PostItGroupStore
   * @return {Map} groups
   */
  getGroups() {
    return groups;
  }

  /**
   * getGroupUser
   * @memberof PostItGroupStore
   * @return {List} groupUsers
   * @param {*} groupId
   */
  getGroup(groupId) {
    return groups.get(groupId);
  }
}

const groupStore = new PostItGroupStore();

PostItDispatcher.register((payload) => {
  const action = payload.action;
  const source = payload.source;
  let groupMap;


  switch (action.type) {
  case PostItActionTypes.GET_GROUPS:
    if (source === 'SERVER_ACTION') {
      getGroups();
    }
    break;

  case PostItActionTypes.ADD_GROUP:
    // make api call to add group name
    addGroupApi(action.groupName);
    break;

  case PostItActionTypes.RECIEVE_GROUP_RESPONSE:
    groupMap = new Map(action.userGroups);
    addNewGroups(groupMap);
    groupStore.emit(CHANGE_EVENT);
    break;

  case PostItActionTypes.CLEAR_GROUPS_STORE:
    groups = new GroupList();
    break;

  default:
    return true;
  }
});
export default groupStore;

