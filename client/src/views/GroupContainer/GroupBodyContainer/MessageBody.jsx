import React from 'react';
import MessageStore from '../../../data/postItStores/PostItMessageStore';
import getMessagesAction from '../../../data/postItActions/getMessagesAction';
import MessageListView from './MessageListView.jsx';


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
    console.log(props.match.params.groupId);
    this.state = {
      messages: MessageStore.getMessage(props.match.params.groupId)
    };

    getMessagesAction({
      groupId: this.props.match.params.groupId
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
      messages: MessageStore.getMessage(this.props.match.params.groupId)
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
      <MessageListView messages={this.state.messages} />
    );
  }
}

module.exports = MessageBody;
