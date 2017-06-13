import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import GroupStore from '../data/postItStores/PostItGroupStore';
import GroupContainer from './GroupContainer.jsx';

/**
 * GroupList is a container for the list of groups, also doubles as a navlink
 */
class GroupList extends React.Component {
  /**
   * React component constructor
   * @return {void}
   */
  constructor() {
    super();
    this.state = {
      groups: GroupStore.getGroups(),
    };
  }

/** render groups
 * @memberof GroupListContainer
 * @returns {void}
 */
  render() {
    return (
    <BrowserRouter >
      <div>
      <GroupContainer groups={this.state.groups}/>
      <Switch>
        <Route exact path='/' />
        <Route exact path='/groupBody' />
        <Route path='/groupBody/:groupId' />
      </Switch>
    </div>
    </BrowserRouter>
    );
  }

}

module.exports = GroupList;
