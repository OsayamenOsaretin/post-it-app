import React, { Component } from 'react';
import MessageStore from '../../../flux/stores/MessageStore';
import markMessagesRead from '../../../flux/actions/readMessagesAction';
import MessageListView from './MessageListView.jsx';
import SendMessage from './SendMessageView.jsx';

/**
 * MessageBody Component
 * @class MessageBody
 * @extends Component
 */
class MessageBody extends Component {
  /**
   * instantiates an instance of a react component
   * @memberof MessageBody
   * 
   * @param {Object} props
   * 
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      messages: MessageStore.getMessage(props.groupId)
    };

    this.onChange = this.onChange.bind(this);
  }

  /**
   * add change listener from Message store
   * @memberof MessageBody
   * 
   * @return {void}
   */
  componentDidMount() {
    MessageStore.addChangeListener(this.onChange, this.props.groupId);
  }

  /**
   * removes change listener from Message store, mark messages as read
   * @memberof MessageBody
   * 
   * @return {void}
   */
  componentWillUnmount() {
    MessageStore.removeChangeListener(this.onChange, this.props.groupId);
  }

  /**
   * updates state on component render
   * @memberof MessageBody
   * 
   * @param {Object} newProps
   * 
   * @return {void}
   */
  componentWillReceiveProps(newProps) {
    MessageStore.removeChangeListener(this.onChange, this.props.groupId);
    MessageStore.addChangeListener(this.onChange, newProps.groupId);
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
   * 
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
   * 
   * @return {void}
   */
  render() {
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

export default MessageBody;
