import React from 'react';
import GroupList from './GroupList.jsx';

/**
 * GroupList is a container for the list of groups, also doubles as a navlink
 * @param {*} props
 * @return {void}
 */
function GroupListView(props) {
  console.log(props);
  return (
      <div>
      <GroupList groups={props.groups}/>
    </div>
  );
}
module.exports = GroupListView;
