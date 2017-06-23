import React from 'react';

/**
 * shows view of messages for each group
 * @param {*} props
 * @return {void}
 */
function MessageListView(props) {
  console.log(props.messages);
  return (
    <div className="message-list-items">
        {props.messages && props.messages.map(message => (
          <div className="message-view">
            <h4 className="message-body-view">{message.message}</h4>
            <h6 className="message-sender-view">from: {message.sender}</h6>
          </div>
        ))}
    </div>
  );
}

module.exports = MessageListView;
