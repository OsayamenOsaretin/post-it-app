import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import GroupContainer from './GroupContainer.jsx';
import GroupDetailContainerView from './GroupDetailContainerView.jsx';
import GroupDefaultView from './GroupDefaultView.jsx';

/**
 * GroupList is a container for the list of groups, also doubles as a navlink
 */
class GroupList extends React.Component {

/** render groups
 * @memberof GroupListContainer
 * @returns {void}
 */
  render() {
    return (
    <BrowserRouter className="group-list-container">
      <div>
      <GroupContainer groups={this.props.groups}/>
      <Switch>
        <Route exact path='/' component={GroupDefaultView}/>
        <Route path='/groupBody/:groupId' component={GroupDetailContainerView}/>
      </Switch>
    </div>
    </BrowserRouter>
    );
  }

}

module.exports = GroupList;
