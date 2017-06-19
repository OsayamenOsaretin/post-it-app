import React from 'react';
import { NavLink } from 'react-router-dom';
import GroupItem from './GroupItem.jsx';

/**
 * GroupContainer holds the navigation links for each group
 * @return {void}
 * @param {*} props
 */
function GroupList(props) {
  return (
      <ul className="group-list">
        <li>
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

module.exports = GroupList;
