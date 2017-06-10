import { EventEmitter } from 'events';
import { Immutable } from 'immutable';
import PostItDispatcher from '../PostItDispatcher';
import PostItActionTypes from '../PostItActionTypes';

const CHANGE_EVENT = 'change';

const groups = {
  groupList: Immutable.List([]),
  editing: false
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
 * @return {Immutable.List} groups
 */
  getGroups() {
    return groups;
  }

}

const groupStore = new PostItGroupStore();

PostItDispatcher.register((payload) => {
  const action = payload.action;

  switch (action.type) {
  case PostItActionTypes.GET_GROUPS: {
    break;
  }
  case PostItActionTypes.ADD_GROUP: {
    break;
  }
  case PostItActionTypes.GET_GROUP_USERS: {
    break;
  }
  default: {
    return true;
  }

  }
});

module.exports = groupStore;

