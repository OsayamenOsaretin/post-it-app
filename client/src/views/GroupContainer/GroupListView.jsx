import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import GroupList from './GroupList.jsx';

/**
 * GroupList is a container for the list of groups, also doubles as a navlink
 * @param {*} props
 * @return {void}
 */
function GroupListView(props) {
  console.log(props);
  return (
    <BrowserRouter >
      <div>
      <GroupList groups={props.groups}/>
      <Switch>
        <Route exact path='/' />
        <Route exact path='/groupBody' />
        <Route path='/groupBody/:groupId' />
      </Switch>
    </div>
    </BrowserRouter>
  );
}
module.exports = GroupListView;