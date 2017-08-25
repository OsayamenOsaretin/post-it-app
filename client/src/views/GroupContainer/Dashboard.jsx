import React from 'react';
import io from 'socket.io-client';
import GroupListView from './GroupListView.jsx';
import { getGroups,
  recieveGroups } from '../../data/postItActions/groupActions';
import receiveRequests from '../../data/postItActions/receiveRequestAction';
import GroupStore from '../../data/postItStores/PostItGroupStore';
// import RequestStore from '../../data/postItStores/PostItGroupRequestStore';
import HeaderView from '../Header.jsx';
import bulkMessageRequest from '../../utility/bulkMessageRequest';

/* global localStorage */

const socket = io('http://localhost:6969');

// http://localhost:6969
// https://postit-app-develop.herokuapp.com/

/**
 * Dashboard Component
 */
class Dashboard extends React.Component {
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
    // initial action to get groups
    getGroups();
    const userId = localStorage.getItem('userId');

    // listen for new groups with socket.io
    socket.on(`newGroup${userId}`, (groups) => {
      recieveGroups(groups);
      bulkMessageRequest(groups);
    });

    socket.on(`newRequests${userId}`, (requests) => {
      console.log('receives requests');
      console.log(requests);
      receiveRequests(requests);
    });

    GroupStore.addChangeListener(this.onChange);
    // RequestStore.addChangeListener(this.onRequestChange);
  }

  /**
   * removes change listener from GroupStore
   * @memberof Dashboard
   * @return {void}
   */
  componentWillUnmount() {
    GroupStore.removeChangeListener(this.onChange);
    // RequestStore.removeChangeListener(this.onRequestChange);
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

  // /**
  //  * onRequestchange listener to listen to changes in requests
  //  * @memberof Dashboard
  //  * @return {void}
  //  */
  // onRequestChange() {
  //   const newRequests = RequestStore.getRequests();
  //   this.setState({
  //     requests: newRequests
  //   });
  // }

  /**
   * renders component view
   * @memberof Dashboard
   * @return {void}
   */
  render() {
    return (
      <div className="dashboard">
        <HeaderView />
        <GroupListView groups={this.state.groups} socket={socket} />
      </div>
    );
  }
}

export default Dashboard;

