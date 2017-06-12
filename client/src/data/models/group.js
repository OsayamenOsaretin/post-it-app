import Immutable from 'immutable';

const GroupRecord = Immutable.Record({
  creator: '',
  groupname: '',
  users: []
});

/**
 * Group extends GroupRecord which models the groups returned from database
 */
class Group extends GroupRecord {

  /**
   * getCreator returns the creator of a group
   * @return {String} creator
   */
  getCreator() {
    return this.get('creator');
  }

/**
 * getGroupName returns the name of the group
 * @return {String} groupName
 */
  getGroupName() {
    return this.get('groupname');
  }

/**
 * getGroupUsers returns a list containing all the users in this particular group
 * @return {List} users
 */
  getGroupUsers() {
    return this.get('users');
  }
}

export default Group;
