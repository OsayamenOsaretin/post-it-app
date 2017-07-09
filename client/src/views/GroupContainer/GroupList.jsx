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
  return (
    <div className="groups">
      <div className="addGroup">
        <AddGroupView />
      </div>
      <ul className="group-list">
      {props.groups.map((group, key) => (
        <li>
          <NavLink exact activeClassName='active' to={`/groupBody/${key}`} >
            <GroupItem
            groupName={group.get('groupname')}
            groupId={key}
            socket ={props.socket}
             />
          </NavLink>
        </li>
      ))}
    </ul>
  </div>
  );
}

GroupList.PropTypes = {
  groups: ImmutablePropTypes.map
};

module.exports = GroupList;
