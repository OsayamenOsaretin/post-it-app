import { EventEmitter } from 'events';
import Group from '../models/group';
import GroupList from '../models/groupList';
import PostItDispatcher from '../PostItDispatcher';
import PostItActionTypes from '../PostItActionTypes';
import { getGroups, addGroupApi } from '../../serverUtils/API';

const CHANGE_EVENT = 'change';

// create empty immutable map to hold group list
const groups = new GroupList();

// add new groups to list of groups
const addNewGroups = (state, newGroupList) => {
  state.merge(newGroupList.map(group => new Group(group)));
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

/**
 * getGroups
 * @memberof PostItGroupStore
 * @return {map} groups
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

  switch (action.type) {
  case PostItActionTypes.GET_GROUPS: {
    if (source === 'SERVER_ACTION') {
      // api utility to call for list of groups
      getGroups();
    }
    break;
  }
  case PostItActionTypes.ADD_GROUP: {
    // make api call to add group name
    addGroupApi(action.groupName);
    break;
  }
  case PostItActionTypes.RECIEVE_GROUP_RESPONSE: {
    // add new groups to immutable map of groups
    addNewGroups(groups, action.response.userGroups);
    groupStore.emit(CHANGE_EVENT);
    break;
  }
  default: {
    return true;
  }

  }
});

module.exports = groupStore;

