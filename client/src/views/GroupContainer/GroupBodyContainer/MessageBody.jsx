import React from 'react';
import MessageStore from '../../../data/postItStores/PostItMessageStore';
import getMessagesAction from '../../../data/postItActions/getMessagesAction';
import MessageListView from './MessageListView.jsx';
import SendMessage from './SendMessageView.jsx';
import AddUser from './AddUserView.jsx';


/**
 * MessageBody Component
 */
class MessageBody extends React.Component {

  /**
   * instantiates an instance of a react component
   * @memberof MessageBody
   * @param {*} props
   * @return {void}
   */
  constructor(props) {
    super(props);
    console.log(props.groupId);
    this.state = {
      messages: MessageStore.getMessage(props.groupId)
    };

    getMessagesAction({
      groupId: this.props.groupId
    });

    this.onChange = this.onChange.bind(this);
  }

  /**
   * add change listener from Message store
   * @memberof MessageBody
   * @return {void}
   */
  componentDidMount() {
    MessageStore.addChangeListener(this.onChange);
  }

  /**
   * removes change listener from Message store
   * @memberof MessageBody
   * @return {void}
   */
  componentWillUnmount() {
    MessageStore.removeChangeListener(this.onChange);
  }

  /**
   * onChange listener toolback to set state of messages
   * @memberof MessageBody
   * @return {void}
   */
  onChange() {
    this.setState({
      messages: MessageStore.getMessage(this.props.groupId)
    });
  }

  /**
   * renders component view
   * @memberof Dashboard
   * @return {void}
   */
  render() {
    console.log(this.state.messages);
    return (
      <div>
        <div className="message-body">
          <MessageListView messages={this.state.messages} />
        </div>
        <div className="send-message">
          <SendMessage groupId={this.props.groupId}/>
        </div>
        </div>
    );
  }
}

module.exports = MessageBody;
