import React from 'react';
import checkReadStatus from '../../../utility/getReadStatus';
import getSenderInitials from '../../../utility/getSenderInitials';
/* global localStorage */

/**
 * shows view of messages for each group
 * @param {*} props
 * @return {void}
 */
function MessageListView(props) {
  const newMessages = props.messages;
  const displayName = localStorage.getItem('username');
  return (
    <div className="message-list-items">
      {newMessages && newMessages.map((message, key) => {
        if (checkReadStatus(message, displayName)) {
          return true;
        }
        return (
          <div
            className="message"
            key={key}>
            <div
              className={
                message.sender !== displayName ? 'sender-initials' :
                  'sender-initials-alternate'
              }
              title={message.sender}>
              {getSenderInitials(message.sender)}
            </div>
            <div className={
              message.sender !== displayName ? 'message-view' :
                'message-view-alternate'
            }>
              <h4 className="message-body-view">{message.message}</h4>
            </div>
            <div className={
              message.sender !== displayName ? 'message-reader' :
                'message-reader-alternate'
            }>
              {message.read && <ul> read:
                {Object.keys(message.read).map(keys => (
                  <li key={keys}>
                    {keys}
                  </li>
                ))}
              </ul>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MessageListView;
