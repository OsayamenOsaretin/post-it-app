import React from 'react';
import PropTypes from 'prop-types';
import FaUserPlus from 'react-icons/lib/fa/user-plus';

import MessageBody from './GroupBodyContainer/MessageBody.jsx';
import AddUser from './GroupBodyContainer/AddUserView.jsx';
import getUserList from '../../data/postItActions/getAllUsersAction';

/**
 * Group Item renders an individual group item
 * @return {void}
 * @param {props} props
 */
class GroupItem extends React.Component {

  /**
   * constructor for GroupItem component
   * @param {*} props
   * @return {void}
   */
  constructor(props) {
    super(props);

    // git get user List
    getUserList();

    this.state = {
      addUser: false
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
   * @return {void}
   * @param {*} newProp
   */
  componentWillReceiveProps() {
    this.setState({
      addUser: false
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
                {this.state.addUser && <AddUser groupId={this.props.match.params.groupId} />}
              </div>
          <MessageBody groupId={this.props.match.params.groupId} socket={this.props.socket} />
        </div>
      </div>
    );
  }
}

// declare proptypes
GroupItem.PropTypes = {
  groupName: PropTypes.string.isRequired,
  groupId: PropTypes.string.isRequired,
};

module.exports = GroupItem;
