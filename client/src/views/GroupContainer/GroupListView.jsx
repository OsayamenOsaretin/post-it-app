import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import WelcomeView from './WelcomeView.jsx';
import GroupList from './GroupList.jsx';
import GroupItem from './GroupItem.jsx';

/**
 * GroupList is a container for the list of groups, also doubles as a navlink
 * @param {*} props
 * @return {void}
 */
function GroupListView(props) {
  return (
    <BrowserRouter >
      <div className="main-view">
        <div className="group-list-nav">
          <GroupList groups={props.groups} />
        </div>
        <div className="group-details">
          <Switch>
            <Route exact path='/' component={WelcomeView} />
            <Route exact path='/groupBody/:groupId/:groupName'
              component={groupProps => (
                <GroupItem {...groupProps} />
              )} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}
export default GroupListView;
