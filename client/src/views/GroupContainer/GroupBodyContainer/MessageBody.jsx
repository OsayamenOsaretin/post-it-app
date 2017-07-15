import React from 'react';
import MessageStore from '../../../data/postItStores/PostItMessageStore';
import markMessagesRead from '../../../data/postItActions/readMessagesAction';
import MessageListView from './MessageListView.jsx';
import SendMessage from './SendMessageView.jsx';
import PostItActionTypes from '../../../data/PostItActionTypes';
import PostItDispatcher from '../../../data/PostItDispatcher';
import getMessagesAction from '../../../data/postItActions/getMessagesAction';
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

    const socket = props.socket;
    console.log(`groupid: ${props.groupId}`);
    getMessagesAction({
      groupId: props.groupId
    });
    socket.on('newMessage', (newMessages) => {
      PostItDispatcher.handleServerAction({
        type: PostItActionTypes.RECIEVE_MESSAGE_RESPONSE,
        Id: newMessages.Id,
        messages: newMessages.groupMessages,
      });
    });

    this.onChange = this.onChange.bind(this);
  }

  /**
   * add change listener from Message store
   * @memberof MessageBody
   * @return {void}
   */
  componentDidMount() {
    MessageStore.addChangeListener(this.onChange, this.props.groupId);
  }

  /**
   * removes change listener from Message store, mark messages as read
   * @memberof MessageBody
   * @return {void}
   */
  componentWillUnmount() {
    MessageStore.removeChangeListener(this.onChange, this.props.groupId);
  }

  /**
   * updates state on component render
   * @memberof MessageBody
   * @return {void}
   * @param {*} newProps
   */
  componentWillReceiveProps(newProps) {
    console.log(newProps);
    MessageStore.removeChangeListener(this.onChange, this.props.groupId);
    // call action to mark all messages as read before unmount
    markMessagesRead({
      messages: this.state.messages
    }, this.props.groupId);
    this.setState({
      messages: MessageStore.getMessage(newProps.groupId)
    });
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
    console.log(JSON.stringify(this.state.messages));
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
