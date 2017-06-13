import React from 'react';
import AddGroupIcon from '../resources/add-group.png';

/**
 * Add group adds a new group to list of user's groups
 */
class AddGroup extends React.Component {

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
   */
  handleSubmit() {
  }

  /**
   * render renders the component
   * @return {void}
   * @memberof AddGroup
   */
  render() {
    return (
     <form className="addGroupForm" onSubmit={this.handleSubmit}>
        <div className="add-group-inputField">
        <input
        id="newGroup"
        placeholder="Group name"
        type="text"
        autoComplete="off"
        value={this.state.fieldInput}
        onChange={this.handleChange}
        />
        <button
        className='add-group-button'
        type='submit'
        disable={!this.state.fieldInput}>
          <img src={AddGroupIcon} />
        </button>
        </div>
     </form>
    );
  }
}

module.exports = AddGroup;
