import React, { Component } from 'react';
import GroupListView from './GroupListView.jsx';
import getGroups from '../../flux/actions/getGroups';
import GroupStore from '../../flux/stores/GroupStore';
import signOutAction from '../../flux/actions/signOutAction';
import HeaderView from '../Header.jsx';

/* global localStorage */

/**
 * Dashboard Component
 * @class Dashboard
 * @extends Component
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
      groups: GroupStore.getGroups(),
      loading: true
    };

    this.onChange = this.onChange.bind(this);
    this.signOutHandler = this.signOutHandler.bind(this);
  }

  /**
   * add change listener from GroupStore
   * @memberof Dashboard
   * @return {void}
   */
  componentDidMount() {
    // initial action to get groups
    getGroups();
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
        groups: GroupStore.getGroups(),
        loading: false
      });
    }
  }
  /**
   * @param {Object} event
   * 
   * @return {void} 
   * @memberof Dashboard
   */
  signOutHandler(event) {
    event.preventDefault();
    signOutAction();
  }

  /**
   * renders component view
   * @memberof Dashboard
   * @return {void}
   */
  render() {
    return (
      <div className="dashboard">
        <HeaderView signOutHandler={this.signOutHandler}
          username={localStorage.getItem('username')}/>
        <GroupListView groups={this.state.groups} loading={this.state.loading}/>
      </div>
    );
  }
}

export default Dashboard;

