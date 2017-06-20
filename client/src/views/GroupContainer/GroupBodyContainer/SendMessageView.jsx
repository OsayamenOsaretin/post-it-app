import React from 'react';
import PropTypes from 'prop-types';
import SendMessageAction from '../../../data/postItActions/sendMessageAction';
import SendIcon from '../../../resources/send.png';

/**
 * Renders view for sending message to a group
 */
class SendMessageView extends React.Component {

  /**
   * constructor creates new react component
   * @param {*} props
   */
  constructor(props) {
    super(props);

    this.state = {
      message: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * handleChange sets input field state when user types
   * @memberof SendMessageView
   * @return {void}
   * @param {*} event
   */
  handleChange(event) {
    const value = event.target.value;

    this.setState(() => ({
      message: value,
    })
    );
  }

/**
   * handleSubmit handles calling the sendmessage action when button is clicked
   * @memberof SendMessageView
   * @return {void}
   * @param {*} event
   */
  handleSubmit(event) {
    event.preventDefault();
    const messageSender = localStorage.getItem('username');
    const group = this.props.groupId;

    const messageDetails = {
      message: this.state.message,
      sender: messageSender,
      groupId: group
    };
    SendMessageAction(messageDetails);
    this.setState({
      message: ''
    });
  }

  /**
   * render renders the component
   * @return {void}
   * @memberof SendMessageView
   */
  render() {
    return (
     <form className="sendMessageForm">
        <div className="send-message-inputField">
        <input
        id="newMessage"
        type="text"
        autoComplete="off"
        value={this.state.message}
        onChange={this.handleChange}
        />
        <button
        className='add-group-button'
        type='submit'
        disabled={!this.state.message}
        onClick={this.handleSubmit}>
          <img src={SendIcon} />
        </button>
        </div>
     </form>
    );
  }
}

SendMessageView.PropTypes = {
  groupId: PropTypes.string.isRequired,
};

module.exports = SendMessageView;
