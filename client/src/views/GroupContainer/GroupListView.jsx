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
  const socketProp = props.socket;
  return (
      <BrowserRouter >
      <div>
      <GroupList groups={props.groups} socket={socketProp}/>
      <div className="group-details">
      <Switch>
        <Route exact path='/' component={WelcomeView}/>
        <Route path='/groupBody/:groupId/:groupName' component={groupProps => (
          <GroupItem socket={socketProp} {...groupProps}/>
        )}/>
      </Switch>
      </div>
    </div>
    </BrowserRouter>
  );
}
module.exports = GroupListView;
