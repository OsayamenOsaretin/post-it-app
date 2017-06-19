import React from 'react';
import GroupListView from './GroupListView.jsx';
import { getGroups } from '../../data/postItActions/groupActions';
import GroupStore from '../../data/postItStores/PostItGroupStore';

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
   * @memberof GroupContainer
   * @return {void}
   */
  componentDidMount() {
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
    this.setState({
      groups: GroupStore.getGroups()
    });
  }

  /**
   * renders component view
   * @memberof Dashboard
   * @return {void}
   */
  render() {
    // console.log(this.state.groups);
    return (
      <GroupListView groups={this.state.groups}/>
    );
  }

}

module.exports = Dashboard;

