import React, { Component } from 'react';
import io from 'socket.io-client';
import GroupListView from './GroupListView.jsx';
import {
  getGroups, recieveGroups,
  receiveRequests
} from '../../flux/actions/groupActions';
import bulkMessageRequest from '../../utility/bulkMessageRequest';
import GroupStore from '../../flux/stores/GroupStore';
import HeaderView from '../Header.jsx';

/* global localStorage */

const socket = io('http://localhost:6969');

/**
 * Dashboard Component
 */
class Dashboard extends Component {
  /**
   * instantiates instance of react components
   * @memberof GroupContainer
   * @return {void}
   */
  constructor() {
    super();
    this.state = {
      groups: GroupStore.getGroups()
    };

    this.onChange = this.onChange.bind(this);
  }

  /**
   * add change listener from GroupStore
   * @memberof Dashboard
   * @return {void}
   */
  componentDidMount() {
    getGroups();
    const userId = localStorage.getItem('userId');
    socket.on(`newGroup${userId}`, (groups) => {
      recieveGroups(groups);
      bulkMessageRequest(groups);
    });

    socket.on(`newRequests${userId}`, (requests) => {
      receiveRequests(requests);
    });
    GroupStore.addChangeListener(this.onChange);
  }

  /**
   * removes change listener from GroupStore
   * @memberof Dashboard
   * @return {void}
   */
  componentWillUnmount() {
    GroupStore.removeChangeListener(this.onChange);
  }

  /**
   * onChange listener toolback to set state of new group list
   * @memberof Dashboard
   * @return {void}
   */
  onChange() {
    const newGroups = GroupStore.getGroups();
    if (this.state.groups.size !== newGroups.size) {
      this.setState({
        groups: GroupStore.getGroups()
      });
    }
  }

  /**
   * renders component view
   * @memberof Dashboard
   * @return {void}
   */
  render() {
    return (
      <div className="dashboard">
        <HeaderView />
        <GroupListView groups={this.state.groups} socket={socket}/>
      </div>
    );
  }
}

export default Dashboard;

