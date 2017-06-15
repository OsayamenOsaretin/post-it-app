import React from 'react';
import Header from './MessageBodyHeader.jsx';
import SendMessage from './SendMessageView.jsx';
import GroupStore from '../data/postItStores/PostItGroupStore';

/**
 * GroupDetailContainerView holds the views for the group message boards
 */
class GroupDetailContainerView extends React.Component {
  /**
   * instatiates instance of react component class
   * @param {*} props
   * @memberof GroupDetailContainerView
   */
  constructor(props) {
    super(props);

    this.state = GroupStore.getGroup(props.match.groupId);
  }

  /**
   * renders component view
   * @return {void}
   * @memberof GroupDetailContainerView
   */
  render() {
    return (
    <div>
      <Header groupName={this.state.groupName}/>
      <SendMessage />
    </div>
    );
  }
}

module.exports = GroupDetailContainerView;
