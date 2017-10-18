import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FaUserPlus from 'react-icons/lib/fa/user-plus';
import MessageBody from './GroupBodyContainer/MessageBody.jsx';
import AddUser from './GroupBodyContainer/AddUserView.jsx';

/**
 * Group Item renders an individual group item
 * @return {void}
 * @param {props} props
 */
class GroupItem extends Component {
  /**
   * constructor for GroupItem component
   * @param {Object} props
   * 
   * @return {void}
   */
  constructor(props) {
    super(props);

    this.state = {
      addUser: false,
      groupId: props.match.params.groupId
    };

    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * handle click action on add user button
   * @return {void}
   */
  handleClick() {
    this.setState({
      addUser: !this.state.addUser
    });
  }

  /** close add user in new group
   * @param {Object} newProps
   * 
   * @return {void}
   */
  componentWillReceiveProps(newProps) {
    this.setState({
      addUser: false,
      groupId: newProps.match.params.groupId
    });
  }

  /**
   * renders the component view
   * @return {void}
   */
  render() {
    return (
      <div className="group-item">
        <div className="group-item-top">
          <div className="group-body-groupname">
            <h4>
              {this.props.match.params.groupName}
            </h4>
          </div>
          <div className="add-user">
            <button
              className="add-user-button"
              onClick={this.handleClick}>
              <FaUserPlus
                size={25}
                color={'#578ec9'}
              />
            </button>
          </div>
        </div>
        <div className="group-item-bottom">
          <div className="user-list">
            {this.state.addUser &&
            <AddUser groupId={this.state.groupId} />}
          </div>
          <MessageBody groupId={this.state.groupId}
            socket={this.props.socket} />
        </div>
      </div>
    );
  }
}

GroupItem.PropTypes = {
  groupName: PropTypes.string.isRequired,
  groupId: PropTypes.string.isRequired,
};

export default GroupItem;
