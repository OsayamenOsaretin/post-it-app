import React from 'react';
import io from 'socket.io-client';
import GroupListView from './GroupListView.jsx';
import { getGroups } from '../../data/postItActions/groupActions';
import GroupStore from '../../data/postItStores/PostItGroupStore';
import PostItDispacher from '../../data/PostItDispatcher';
import PostItActionTypes from '../../data/PostItActionTypes';

const socket = io('https://postit-app-develop.herokuapp.com/');

// https://postit-app-develop.herokuapp.com/

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


    getGroups(socket);

    socket.on('newGroup', (groups) => {
      PostItDispacher.handleServerAction({
        type: PostItActionTypes.RECIEVE_GROUP_RESPONSE,
        userGroups: groups
      });
    }
    );

    this.onChange = this.onChange.bind(this);
  }

  /**
   * add change listener from GroupStore
   * @memberof Dashboard
   * @return {void}
   */
  componentDidMount() {
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
    return (
      <GroupListView groups={this.state.groups} socket={socket}/>
    );
  }

}

module.exports = Dashboard;

