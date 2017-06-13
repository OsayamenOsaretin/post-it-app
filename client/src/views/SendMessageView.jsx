import React from 'react';
import SendMessageIcon from '../resources/send.png';

/**
 * SendMessageInputField helps to send messages to a group
 */
class SendMessageInputField extends React.Component {

  /**
   * constructor creates new react component, initializes state
   */
  constructor() {
    super();

    this.state = {
      fieldInput: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * handleChange sets input field state when user types
   * @memberof SendMessageInputField
   * @return {void}
   * @param {*} event
   */
  handleChange(event) {
    const value = event.target.value;

    this.setState(() => ({
      fieldInput: value,
    })
    );
  }

  /**
   * handleSubmit handles calling the sendmessage action when button is clicked
   * @memberof SendMessageInputField
   * @return {void}
   */
  handleSubmit() {
  }

  /**
   * render renders the component
   * @return {void}
   * @memberof SendMessageInputField
   */
  render() {
    return (
     <form className="messageForm" onSubmit={this.handleSubmit}>
        <div className="message-inputField">
        <input
        id="messageInput"
        placeholder="Enter message"
        type="text"
        autoComplete="off"
        value={this.state.fieldInput}
        onChange={this.handleChange}
        />
        <button
        className='send-message-button'
        type='submit'
        disable={!this.state.fieldInput}>
          <img src={SendMessageIcon} />
        </button>
        </div>
     </form>
    );
  }
}

module.exports = SendMessageInputField;

