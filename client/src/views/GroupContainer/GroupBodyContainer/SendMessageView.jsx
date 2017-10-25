import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FaExclamationCircle from 'react-icons/lib/fa/exclamation-circle';
import FaPaperPlane from 'react-icons/lib/fa/paper-plane';
import SendMessageAction from '../../../flux/actions/sendMessageAction';

/* global localStorage */

const defaultState = {
  message: '',
  priorityLevel: 0,
  stringLevel: 'grey',
  priority: 'normal',
};

/**
 * Renders view for sending message to a group
 */
class SendMessageView extends Component {
  /**
   * constructor creates new react component
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = defaultState;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.togglePriority = this.togglePriority.bind(this);
  }

  /**
   * handleChange sets input field state when user types
   * @memberof SendMessageView
   * @return {void}
   * @param {Object} event
   */
  handleChange(event) {
    const value = event.target.value;

    this.setState({
      message: value
    });
  }

  /**
     * handleSubmit handles calling the sendmessage 
     * action when button is clicked
     * @memberof SendMessageView
     * @return {void}
     * @param {Object} event
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
    SendMessageAction(messageDetails);
    this.setState(defaultState);
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
          <div
            className="normal"
            title="Pick a priority level, red's a scream ;-)"
            onClick={this.togglePriority}
            disabled={!this.state.message}>
            <FaExclamationCircle
              size={20}
              color={this.state.stringLevel} />
          </div>
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

export default SendMessageView;
