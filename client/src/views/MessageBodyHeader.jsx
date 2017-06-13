import React from 'react';
import AddUserIcon from '../resources/add-user.png';

/**
 * makes call for action to add a user
 * @return {void}
 */
function handleClick() {
}

/**
 * Message body header
 * @return {void}
 * @param {*} props
 */
function MessageBodyHeader(props) {
  return (
    <div className="group-body-header">
      <div className="group-description">
        {props.groupName}
      </div>
      <div className="add-user">
        <button className='add-user-button'
        onClick={handleClick}>
          <img src={AddUserIcon} />
        </button>
      </div>
    </div>
  );
}

module.exports = MessageBodyHeader;
