import React from 'react';
import PropTypes from 'prop-types';
import FaExclamationCircle from 'react-icons/lib/fa/exclamation-circle';
import FaPaperPlane from 'react-icons/lib/fa/paper-plane';
import SendMessageAction from '../../../data/postItActions/sendMessageAction';


/* global localStorage */
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
      message: '',
      priorityLevel: 0,
      stringLevel: 'grey',
      priority: 'normal',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.togglePriority = this.togglePriority.bind(this);
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
      groupId: group,
      priorityLevel: this.state.priority
    };
    console.log(messageDetails);
    SendMessageAction(messageDetails);
    this.setState({
      message: '',
      priorityLevel: 0,
      stringLevel: 'grey',
      priority: 'normal'
    });
  }

  /**
   * @memberof SendMessageView
   * @return {void}
   * @param {*} event
   */
  togglePriority(event) {
    event.preventDefault();
    const priorityLevel = this.state.priorityLevel;
    const newState = (priorityLevel + 1) % 3;
    let messagePriority;

    let level;

    switch (newState) {
    case 0: {
      level = 'grey';
      messagePriority = 'normal';
      break;
    }
    case 1: {
      level = 'orange';
      messagePriority = 'urgent';
      break;
    }
    case 2: {
      level = 'red';
      messagePriority = 'critical';
      break;
    }
    default: {
      level = 'grey';
      messagePriority = 'normal';
    }
    }

    this.setState({
      priorityLevel: newState,
      stringLevel: level,
      priority: messagePriority
    });
  }

  /**
   * render renders the component
   * @return {void}
   * @memberof SendMessageView
   */
  render() {
    return (
      <div className="send-message-form">
        <form>
          <button
            className="normal"
            title="Pick a priority level, red's a scream ;-)"
            onClick={this.togglePriority}
            disabled={!this.state.message}>
            <FaExclamationCircle
              size={20}
              color={this.state.stringLevel} />
          </button>
          <input
            type="text"
            autoComplete="off"
            placeholder="Send new message"
            value={this.state.message}
            onChange={this.handleChange}
          />
          <button
            type='submit'
            disabled={!this.state.message}
            onClick={this.handleSubmit}>
            <FaPaperPlane
              size={25}/>
          </button>
        </form>
      </div>
    );
  }
}

SendMessageView.PropTypes = {
  groupId: PropTypes.string.isRequired,
};

module.exports = SendMessageView;
