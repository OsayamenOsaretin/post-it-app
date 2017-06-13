import React from 'react';
import { NavLink } from 'react-router-dom';
import GroupItem from './GroupItem.jsx';
import AddGroup from './AddGroupView.jsx';

/**
 * GroupContainer holds the navigation links for each group
 * @return {void}
 * @param {*} props
 */
function GroupContainer(props) {
  return (
      <ul className="group-list">
        <li>
          <AddGroup />
        </li>
      {props.groups.map(group => (
        <li>
          <NavLink exact activeClassName='active' to={`/groupBody/${group.groupId}`} >
            <GroupItem
            groupName={group.groupname}
            creator={group.creator}
            notification={true}
             />
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

module.exports = GroupContainer;
