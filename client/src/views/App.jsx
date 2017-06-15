import React from 'react';
import UserStore from '../data/postItStores/PostItUserStore';
import LoginRegisterContainer from './LandingPageContainer.jsx';
import GroupViewContainer from './GroupViewContainer.jsx';

/**
 * App contains root component
 */
class App extends React.Component {

  /**
   * instantiates an instace of react components
   * @memberof App
   */
  constructor() {
    super();
    this.state = {
      token: UserStore.getSignedInState(),
    };
  }

/**
 * @return {void}
 * add change Listener when component mounts
 * @memberof App
 */
  componenentDidMount() {
    UserStore.addChangeListener(this.onChange);
  }

  /**
   * @return {void}
   * remove listener when component unmounts
   * @memberof App
   */
  componentWillUnmount() {
    UserStore.removeChangeListener(this.onChange);
  }

  /**
   * sets state to update signed in state
   * @return {void}
   * @memberof App
   */
  onChange() {
    this.setState({
      token: UserStore.getSignedInState(),
    });
  }

  /**
   * @return {void}
   * renders either the Group view of Login view depending on user sign in state
   */
  render() {
    return (
      <div>
        {this.state.token ? <GroupViewContainer /> : < LoginRegisterContainer /> }
      </div>
    );
  }
}

module.exports = App;
