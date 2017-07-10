import React from 'react';
import checkReadStatus from '../../../utility/getReadStatus';
/* global localStorage */

/**
 * shows view of messages for each group
 * @param {*} props
 * @return {void}
 */
function MessageListView(props) {
  console.log(props.messages);
  const newMessages = props.messages;
  const displayName = localStorage.getItem('username');
  return (
    <div className="message-list-items">
        {newMessages && newMessages.map((message) => {
          if (checkReadStatus(message, displayName)) {
            return true;
          }
          return (<div className="message-view">
            <h4 className="message-body-view">{message.message}</h4>
            {message.read && <ul> readby:
                {Object.keys(message.read).map(keys => (
                  <li>
                    {keys}
                  </li>
                ))}
              </ul>}
            <h6 className="message-sender-view">from: {message.sender}</h6>
          </div>);
        })}
    </div>
  );
}

module.exports = MessageListView;
