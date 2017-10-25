import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import addUserAction from '../../../flux/actions/addUserGroup';


/**
 * GroupContainer holds the navigation links for each group
 * @return {void}
 * 
 * @param {Object} props
 */
function UserList(props) {
  /**
   * handleSelect handles selection and makes api call to add user to group
   * @param {Object} event
   * 
   * @returns {void}
   */
  const handleSelect = (event) => {
    event.preventDefault();
    const group = props.groupId;
    const value = event.target.value;
    const Details = {
      userId: value,
      groupId: group
    };
    addUserAction(Details);
    props.handleStatusChange(value);
  };

  /**
   * logic to show name or request sent message
   * @param {String} key 
   * 
   * @return {void}
   */
  const showRequestMessageOrName = (key) => {
    const statusMap = props.userStatus;
    return !statusMap.get(key);
  };

  return (
    <form>
      <select
        name='Add User'
        size='5'
        onChange={handleSelect}
      >
        {props.users.entrySeq().map(([key, user]) => (
          <option
            value={key}
            key={key}
          >
            { showRequestMessageOrName(key) ? user.username :
              'Request Sent!'}
          </option>
        ))}
      </select>
    </form>
  );
}

UserList.PropTypes = {
  users: ImmutablePropTypes.map,
};

export default UserList;
