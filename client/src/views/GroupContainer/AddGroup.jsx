import React from 'react';
import AddGroupIcon from '../../resources/add-group.png';
import { addGroupApi } from '../../data/postItActions/groupActions';

/**
 * Add group adds a new group to list of user's groups
 */
class AddGroupView extends React.Component {

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
    addGroupApi({ groupName: this.state.fieldInput });
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
     <form className="addGroupForm">
        <div className="add-group-inputField">
        <input
        className="newGroup"
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
          Add
        </button>
        </div>
     </form>
    );
  }
}

module.exports = AddGroupView;
