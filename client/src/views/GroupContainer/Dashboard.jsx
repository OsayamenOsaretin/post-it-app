import React, { Component } from 'react';
import GroupListView from './GroupListView.jsx';
import getGroups from '../../actions/getGroups';
import GroupStore from '../../stores/GroupStore';
import signOutAction from '../../actions/signOutAction';
import HeaderView from '../Header.jsx';

/* global $ localStorage */

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
      username: localStorage.getItem('username'),
      groups: GroupStore.getGroups(),
      loading: GroupStore.getLoadingState()
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
    let tourObject = localStorage.getItem('tourObject');
    if (tourObject) {
      const parsedTourObject = JSON.parse(tourObject);
      if (!parsedTourObject.mainTour) {
        $('body').chardinJs('start');
        parsedTourObject.mainTour = true;
        localStorage.setItem('tourObject', parsedTourObject);
      }
    } else {
      $('body').chardinJs('start');
      tourObject = {
        messageTour: undefined,
        mainTour: true,
      };
      localStorage.setItem('tourObject', tourObject);
    }
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
    if (this.state.groups.size !== newGroups.size ||
    this.state.loading === true) {
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
          username={this.state.username}/>
        <GroupListView groups={this.state.groups} loading={this.state.loading}/>
      </div>
    );
  }
}

export default Dashboard;

