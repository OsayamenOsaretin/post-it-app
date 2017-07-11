import React from 'react';
import FaSpinner from 'react-icons/lib/fa/spinner';
import signInAction from '../../data/postItActions/userSignInAction';
import ErrorStore from '../../data/postItStores/PostItErrorStore';

/**
 *
 */
class LoginForm extends React.Component {
  /**
  *
  *
  */
  constructor() {
    super();

    this.state = {
      password: '',
      email: '',
      login: false,
      errorMessage: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
/**
 * @memberof LoginComponent
 * @returns {void}
 * @param {*} event
 */
  handleChange(event) {
    const value = event.target.value;

    this.setState({
      [event.target.name]: value
    });
  }

  /**
   * @memberof LoginComponent
   * @returns {void}
   * @param {*} event
   */
  handleSubmit(event) {
    event.preventDefault();

    console.log('calls sign in action');
    signInAction({
      email: this.state.email,
      password: this.state.password
    });

    // set state of login to start spinner
    this.setState({
      login: true,
      errorMessage: ''
    });
  }

  /**
   * onChange method callback for error store
   * @return {void}
   */
  onChange() {
    const loginError = ErrorStore.getLoginError();
    if (loginError) {
      this.setState({
        errorMessage: loginError,
        password: '',
        login: false
      });
    }
  }

  /**
   * add change listener from ErrorStore
   * @memberof LoginComponent
   * @return {void}
   */
  componentDidMount() {
    ErrorStore.addChangeListener(this.onChange);
  }

  /**
   * removes change listener from GroupStore
   * @memberof LoginComponent
   * @return {void}
   */
  componentWillUnmount() {
    ErrorStore.removeChangeListener(this.onChange);
  }

/**
 * @memberof LoginComponent
 * @returns {void}
 */
  render() {
    return (
      <form className = 'inputform'>
        <input
        id = 'formInput'
        name = 'email'
        placeholder = 'email'
        type ='email'
        autoComplete = 'off'
        value = {this.state.email}
        onChange = {this.handleChange} />

      <input
        id = 'formInput'
        name = 'password'
        placeholder = 'password'
        type ='password'
        autoComplete = 'off'
        value = {this.state.password}
        onChange = {this.handleChange} />

        <button
        className = 'button'
        onClick = {this.handleSubmit}
        type = 'submit'
        disabled = { !this.state.password || !this.state.email }>
        Log in {this.state.login && <FaSpinner className="fa fa-spinner fa-spin"/>}
        </button>

        {this.state.errorMessage && 
          <div className="error-login-register">
            {this.state.errorMessage}
          </div>
          }
      </form>
    );
  }
}

module.exports = LoginForm;
