import React, { Component } from 'react';
import GroupListView from './GroupListView.jsx';
import { getGroups } from '../../data/postItActions/groupActions';
import GroupStore from '../../data/postItStores/PostItGroupStore';
import HeaderView from '../Header.jsx';

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
        <GroupListView groups={this.state.groups} />
      </div>
    );
  }
}

export default Dashboard;

