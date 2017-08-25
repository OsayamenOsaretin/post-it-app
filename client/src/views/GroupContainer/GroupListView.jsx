import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import WelcomeView from './WelcomeView.jsx';
import GroupList from './GroupList.jsx';
import GroupItem from './GroupItem.jsx';
import PostItActionTypes from '../../data/PostItActionTypes';
import PostItDispatcher from '../../data/PostItDispatcher';

/**
 * GroupList is a container for the list of groups, also doubles as a navlink
 * @param {*} props
 * @return {void}
 */
function GroupListView(props) {
  const socketProp = props.socket;

  // attach listener for new messages
  socketProp.on('newMessage', (newMessages) => {
    PostItDispatcher.handleServerAction({
      type: PostItActionTypes.RECIEVE_MESSAGE_RESPONSE,
      Id: newMessages.Id,
      messages: newMessages.groupMessages,
      notify: newMessages.notify
    });
  });

  // attach listener for new users
  socketProp.on('Users', (UserList) => {
    PostItDispatcher.handleServerAction({
      type: PostItActionTypes.RECIEVE_USERS,
      users: UserList.userList,
      id: UserList.Id
    });
  });

  return (
    <BrowserRouter >
      <div className="main-view">
        <div className="group-list-nav">
          <GroupList groups={props.groups} socket={socketProp} />
        </div>
        <div className="group-details">
          <Switch>
            <Route exact path='/' component={WelcomeView} />
            <Route exact path='/groupBody/:groupId/:groupName'
              component={groupProps => (
                <GroupItem socket={socketProp} {...groupProps} />
              )} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}
export default GroupListView;
