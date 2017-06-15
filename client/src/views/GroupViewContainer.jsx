import React from 'react';
import GroupListContainer from './GroupListContainer.jsx';
import GroupStore from '../data/postItStores/PostItGroupStore';

/**
 * GroupViewContainer holds the entire group view and message dashboard.
 */
class GroupViewContainer extends React.Component {

/**
 * constructor creates instance of react component class
 * @memberof GroupListContainer
 */
  constructor() {
    super();
    this.state = GroupStore.getGroups();

    this.onChange.bind(this);
  }

/**
 * @returns {void}
 * adds change listener when component mounts
 * @memberof GroupListContainer
 */
  componentDidMount() {
    GroupStore.addChangeListener(this.onChange);
  }

/**
 * @returns {void}
 * removes listener when component unmounts
 * @memberof GroupListContainer
 */
  componentWillUnmount() {
    GroupStore.removeChangeListener(this.onChange);
  }

/**
 * sets state to updated grouplist
 * @returns {void}
 * @memberof GroupListContainer
 */
  onChange() {
    this.setState(this.state = GroupStore.getGroups());
  }

/**
 * renders the component view
 * @return {void}
 * @memberof GroupListContainer
 */
  render() {
    return (
      <div>
        <GroupListContainer groups={this.state}/>
      </div>
    );
  }
}


module.exports = GroupViewContainer;
