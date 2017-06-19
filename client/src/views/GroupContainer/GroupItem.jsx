import React from 'react';
import PropTypes from 'prop-types';

import notificationIcon from '../../resources/alarm.png';
/**
 * Group Item renders an individual group item
 * @return {void}
 * @param {props} props
 */
function GroupItem(props) {
  return (
    <div className="group-item">
      <ul className="group-item-top">
        <li>{props.groupName}</li>
        <li>
          <img src ={notificationIcon} />
        </li>
      </ul>
    </div>
  );
}

// declare proptypes
GroupItem.PropTypes = {
  groupName: PropTypes.string.isRequired,
  notification: PropTypes.bool.isRequired
};

module.exports = GroupItem;
