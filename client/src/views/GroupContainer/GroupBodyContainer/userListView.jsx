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
    console.log('handle selection action...');
    event.preventDefault();
    const value = event.target.value;
    console.log(`Value to be deleted: ${value}`);
    const Details = {
      userId: value,
      groupId: group
    };
    addUserAction(Details);
    // props.users.delete(value);
  };

  return (
    <form>
        <select
        name='Add User'
        size='5'
        onChange={handleSelect}
        >
        {console.log(props.users)}
        {props.users.map((user, key) => (
        <option
        value={key}
        >
        {console.log(user.username)}
        {console.log(user.get('username'))}
          {user.get('username')}
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
