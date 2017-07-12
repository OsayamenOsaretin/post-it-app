import React from 'react';
import { NavLink } from 'react-router-dom';
import ImmutablePropTypes from 'react-immutable-proptypes';
import AddGroupView from './AddGroup.jsx';
import getMessagesAction from '../../data/postItActions/getMessagesAction';
import PostItDispatcher from '../../data/PostItDispatcher';
import PostItActionTypes from '../../data/PostItActionTypes';

/**
 * GroupContainer holds the navigation links for each group
 * @return {void}
 * @param {*} props
 */
function GroupList(props) {
  return (
    <div className="groups">
      <div className="addGroup">
        <AddGroupView />
      </div>
      <ul className="group-list">
      {props.groups.map((group, key) => {
        // call initial action for messages
        getMessagesAction({
          groupId: key
        }, props.socket);

        const socket = props.socket;
        // Attach socket.io event listener for changes in database
        socket.on('newMessage', (newMessages) => {
          PostItDispatcher.handleServerAction({
            type: PostItActionTypes.RECIEVE_MESSAGE_RESPONSE,
            Id: newMessages.Id,
            messages: newMessages.groupMessages
          });
        });


        return (<li>
          <NavLink exact activeClassName='active'
          to={`/groupBody/${key}/${group.get('groupname')}`} >
            <div className="group-list-item">
              {group.get('groupname')}
            </div>
          </NavLink>
        </li>);
      })}
    </ul>
  </div>
  );
}

GroupList.PropTypes = {
  groups: ImmutablePropTypes.map
};

module.exports = GroupList;
