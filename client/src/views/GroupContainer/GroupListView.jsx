import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import GroupList from './GroupList.jsx';

/**
 * GroupList is a container for the list of groups, also doubles as a navlink
 * @param {*} props
 * @return {void}
 */
function GroupListView(props) {
  return (
      <BrowserRouter >
      <div>
      <GroupList groups={props.groups} socket={props.socket}/>
      <Switch>
        <Route exact path='/' />
        <Route path='/groupBody/:groupId' />
      </Switch>
    </div>
    </BrowserRouter>
  );
}
module.exports = GroupListView;
