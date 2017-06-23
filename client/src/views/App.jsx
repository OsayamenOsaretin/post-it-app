import React from 'react';
import DummyView from './DummyView';
import LoginRegisterContainer from './LoginRegisterContainer/LandingPageContainer.jsx';
import Dashboard from './GroupContainer/Dashboard.jsx';
import SendMessage from './GroupContainer/GroupBodyContainer/SendMessageView.jsx';
import UserStore from '../data/postItStores/PostItUserStore';
import AddUser from './GroupContainer/GroupBodyContainer/AddUserView.jsx';


/**
 * App view that holds the entire container view for the app
 */
class App extends React.Component {

  /**
   * instantiates an instance of the react component view
   * @memberof App
   */
  constructor() {
    super();
    this.state = {
      token: UserStore.getSignedInState()
    };

    this.onChange = this.onChange.bind(this);
  }

/**
 * Attaches event listener to the UserStore
 * @return {void}
 * @memberof App
 */
  componentDidMount() {
    UserStore.addChangeListener(this.onChange);
  }

/**
 * Removes event listener from the UserStore
 * @return {void}
 * @memberof App
 */
  componentWillUnmount() {
    UserStore.removeChangeListener(this.onChange);
  }

  /**
   * Change event call back to update state
   * @memberof App
   * @return {void}
   */
  onChange() {
    this.setState({
      // token: UserStore.getSignedInState()
      token: true
    });
  }

/**
 * renders the component view
 * @return {void}
 */
  render() {
    return (
      <div>
        {!this.state.token ? <LoginRegisterContainer /> : <Dashboard />}
      </div>
    );
  }
}

module.exports = App;
