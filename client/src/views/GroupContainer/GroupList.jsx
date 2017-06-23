import React from 'react';
import { NavLink } from 'react-router-dom';
import ImmutablePropTypes from 'react-immutable-proptypes';
import GroupItem from './GroupItem.jsx';
import AddGroupView from './AddGroup.jsx';

/**
 * GroupContainer holds the navigation links for each group
 * @return {void}
 * @param {*} props
 */
function GroupList(props) {
  console.log(props.groups);
  return (
      <ul className="group-list">
        <li>
          <AddGroupView />
        </li>
      {props.groups.map((group, key) => (
        <li>
          <NavLink exact activeClassName='active' to={`/groupBody/${key}`} >
            <GroupItem
            groupName={group.get('groupname')}
            notification={true}
             />
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

GroupList.PropTypes = {
  groups: ImmutablePropTypes.map
};

module.exports = GroupList;
