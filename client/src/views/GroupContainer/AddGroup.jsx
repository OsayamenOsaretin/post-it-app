import React, { Component } from 'react';
import FaPlus from 'react-icons/lib/fa/plus';
import { addGroupApi } from '../../flux/actions/groupActions';

/* global localStorage */

/**
 * Add group adds a new group to list of user's groups
 */
class AddGroupView extends Component {
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
   * @memberof AddGroup
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
   * @memberof AddGroup
   * @return {void}
   * @param {*} event
   */
  handleSubmit(event) {
    event.preventDefault();
    const userId = localStorage.getItem('userId');
    addGroupApi({
      groupName: this.state.fieldInput,
      id: userId
    });
    this.setState({
      fieldInput: ''
    });
  }

  /**
   * render renders the component
   * @return {void}
   * @memberof AddGroup
   */
  render() {
    return (
      <form className="add-group-form">
        <input
          className="new-group-input"
          placeholder="Enter a name for your new group"
          type="text"
          autoComplete="off"
          value={this.state.fieldInput}
          onChange={this.handleChange}
        />
        <button
          className='add-group-button'
          type='submit'
          disabled={!this.state.fieldInput}
          onClick={this.handleSubmit}>
          <FaPlus size={20}/>
        </button>
      </form>
    );
  }
}

export default AddGroupView;
