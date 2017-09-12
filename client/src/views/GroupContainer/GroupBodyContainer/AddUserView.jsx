import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AllUserStore from '../../../data/postItStores/PostItAllUsersStore';
import UserListView from './userListView.jsx';


/**
 * Add user view
 */
class AddUserView extends Component {
  /**
   * renders an instace of a react component
   * @returns {void}
   * @param {*} props
   */
  constructor(props) {
    super(props);

    const usersStatusMap = new Map();

    this.state = {
      users: AllUserStore.getUsers(props.groupId),
      userStatus: usersStatusMap
    };

    this.onChange = this.onChange.bind(this);
    this.statusChange = this.statusChange.bind(this);
  }

  /**
   * adds change event listener to All users store
   * @return {void}
   */
  componentDidMount() {
    AllUserStore.addChangeListener(this.onChange, this.props.groupId);
  }

  /**
   * removes change event listener from All users store
   * @return {void}
   */
  componentWillUnmount() {
    AllUserStore.removeChangeListener(this.onChange, this.props.groupId);
  }

  /**
   * callback attached to change listener
   * @return {void}
   */
  onChange() {
    this.setState({
      users: AllUserStore.getUsers(this.props.groupId)
    });
  }

  /**
   * changes status of user when the user is clicked
   * @return {void}
   * @param {int} index
   */
  statusChange(index) {
    let statusMap = this.state.userStatus;
    statusMap = statusMap.set(index, true);
    this.setState({
      userStatus: statusMap
    });
  }

  /**
   * renders component view
   * @return {void}
   */
  render() {
    return (
      <div>
        <UserListView users={this.state.users}
          groupId={this.props.groupId}
          userStatus={this.state.userStatus}
          handleStatusChange = {this.statusChange}/>
      </div>
    );
  }
}

AddUserView.PropTypes = {
  groupId: PropTypes.string.isRequired
};

export default AddUserView;
