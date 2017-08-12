import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import addUserAction from '../../../data/postItActions/addUserGroup';


/**
 * GroupContainer holds the navigation links for each group
 * @return {void}
 * @param {*} props
 */
function UserList(props) {
  const group = props.groupId;

  /**
   * handleSelect handles selection and makes api call to add user to group
   * @returns {void}
   * @param {*} event
   */
  const handleSelect = (event) => {
    event.preventDefault();
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
   * @param {*} key 
   * @return {void}
   */
  const showRequestMessageOrName = (key) => {
    console.log(props.userStatus);
    const statusMap = props.userStatus;
    if (statusMap.get(key)) {
      console.log(statusMap);
      return false;
    }
    return true;
  };

  return (
    <form>
      <select
        name='Add User'
        size='5'
        onChange={handleSelect}
      >
        {props.users.map((user, key) => (
          <option
            value={key}
          >
            {showRequestMessageOrName(key) ?
              user.get('username') :
              'Request Sent!' }
          </option>
        ))}
      </select>
    </form>
  );
}

UserList.PropTypes = {
  users: ImmutablePropTypes.map,
};

module.exports = UserList;
