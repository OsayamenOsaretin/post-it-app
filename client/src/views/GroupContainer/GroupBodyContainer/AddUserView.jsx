import React from 'react';
import PropTypes from 'prop-types';
import AllUserStore from '../../../data/postItStores/PostItAllUsersStore';
import UserListView from './userListView.jsx';


/**
 * Add user view
 */
class AddUserView extends React.Component {

  /**
   * renders an instace of a react component
   * @returns {void}
   * @param {*} props
   */
  constructor(props) {
    super(props);

    this.state = {
      users: AllUserStore.getUsers()
    };

    this.onChange = this.onChange.bind(this);
  }

  /**
   * adds change event listener to All users store
   * @return {void}
   */
  componentDidMount() {
    AllUserStore.addChangeListener(this.onChange);
  }

  /**
   * removes change event listener from All users store
   * @return {void}
   */
  componentWillUnmount() {
    AllUserStore.removeChangeListener(this.onChange);
  }

  /**
   * callback attached to change listener
   * @return {void}
   */
  onChange() {
    this.setState({
      users: AllUserStore.getUsers()
    });
  }

  /**
   * renders component view
   * @return {void}
   */
  render() {
    return (
      <div>
        <UserListView users={this.state.users} groupId={this.props.groupId} />
      </div>
    );
  }
}

AddUserView.PropTypes = {
  groupId: PropTypes.string.isRequired
};

module.exports = AddUserView;
