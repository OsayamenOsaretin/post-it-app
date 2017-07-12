import React from 'react';
import PropTypes from 'prop-types';
import FaExclamationCircle from 'react-icons/lib/fa/exclamation-circle';
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
      stringLevel: 'black',
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
      stringLevel: 'normal'
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
      level = 'black';
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
      level = 'black';
      messagePriority = 'normal';
    }
    }

    this.setState({
      priorityLevel: newState,
      stringLevel: level,
      priority: messagePriority
    });
     console.log(this.state);
  }

  /**
   * render renders the component
   * @return {void}
   * @memberof SendMessageView
   */
  render() {
    return (
        <form>
           <button
            className="normal"
            onClick={this.togglePriority}
            disabled={!this.state.message}>
              <FaExclamationCircle
              size={20}
              color={this.state.stringLevel}/>
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
              Send
            </button>
        </form>
    );
  }
}

SendMessageView.PropTypes = {
  groupId: PropTypes.string.isRequired,
};

module.exports = SendMessageView;
