import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import ImmutablePropTypes from 'react-immutable-proptypes';
import FaBell from 'react-icons/lib/fa/bell';
import FaGroup from 'react-icons/lib/fa/group';
import AddGroupView from './AddGroup.jsx';
import RequestListView from './RequestList.jsx';
import MessageStore from '../../flux/stores/MessageStore';


/**
 * component for the list of groups and notifications
 * @class GroupList
 * @extends Component
 */
class GroupList extends Component {
  /**
   * react component constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      groupWithNotificationChange: '',
      groupList: props.groups,
    };

    this.onChange = this.onChange.bind(this);
    this.sortGroups = this.sortGroups.bind(this);
  }

  /**
   * lifecycle event to attach message store listener
   * @return {void}
   */
  componentDidMount() {
    MessageStore.addNotificationChangeListener(this.onChange);
  }

  /**
   * lifecycle event to remove message store listener
   * @return {void}
   */
  componentWillUnmount() {
    MessageStore.removeNotificationChangeListener(this.onChange);
  }

  /**
   * on change listener to update groupslist on new message
   * @return {void}
   */
  onChange() {
    const notificationDetails = MessageStore.getGroupNotificationDetails();
    const groupId = notificationDetails.Id;
    const status = notificationDetails.status.get(groupId);

    if (status) {
      this.setState({
        groupWithNotificationChange: groupId
      });
    }
  }

  /**
   * function to modify group list based on notification
   * @param {Array} groupSeq
   * 
   * @return {Array} groupSeqSorted
   */
  sortGroups(groupSeq) {
    const newGroupWithNotification = this.state.groupWithNotificationChange;
    const status = MessageStore.getGroupNotificationDetails()
      .status.get(newGroupWithNotification);

    if (status && newGroupWithNotification) {
      groupSeq = groupSeq.sort((number1, number2) => {
        if (number1 === newGroupWithNotification) {
          return -1;
        } else if (number2 === newGroupWithNotification) {
          return 1;
        }
        return 0;
      });
    }
    return groupSeq;
  }

  /**
   * render the view for the groupList
   * @return {View} GroupListView
   */
  render() {
    return (
      <div className="groups">
        <div className="add-group">
          <AddGroupView />
        </div>
        <div className="group-list-body">
          <RequestListView />
          <ul className="group-list">
            {this.sortGroups(this.props.groups.keySeq().toArray())
              .map(groupKey => (
                <li key={groupKey}>
                  <NavLink exact activeClassName='active'
                    to={`/groupBody/${groupKey}/${
                      this.props.groups.get(groupKey).get('groupname')
                    }`} >
                    <div className="group-list-item">
                      <p>
                        <FaGroup
                          className="groups-icon"
                          size={20}
                        />
                        {this.props.groups.get(groupKey).get('groupname')}
                      </p>
                      <div className="notification">
                        {MessageStore.getGroupNotificationDetails()
                          .status.get(groupKey) &&
                          <FaBell color={'#578ec9'} />}
                      </div>
                    </div>
                  </NavLink>
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}

GroupList.PropTypes = {
  groups: ImmutablePropTypes.map.isRequired
};

export default GroupList;
