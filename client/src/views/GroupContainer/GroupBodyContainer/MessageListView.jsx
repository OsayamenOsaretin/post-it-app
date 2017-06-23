import React from 'react';

/**
 * shows view of messages for each group
 * @param {*} props
 * @return {void}
 */
function MessageListView(props) {
  console.log(props.messages);
  return (
    <div className="message-list-item">
        {props.messages && props.messages.map(message => (
          <div className="message-view">
            <h2 className="message-body-view">{message.message}</h2>
            from: <h4 className="message-sender-view">{message.sender}</h4>
          </div>
        ))}
    </div>
  );
}

module.exports = MessageListView;
