import React from 'react';
import FaSpinner from 'react-icons/lib/fa/spinner';
import FaSquareO from 'react-icons/lib/fa/square-o';
import FaCheckSquareO from 'react-icons/lib/fa/check-square-o';
import FaExclamationTriangle from 'react-icons/lib/fa/exclamation-triangle';
import registerAction from '../../data/postItActions/registerUserAction';
import ErrorStore from '../../data/postItStores/PostItErrorStore';

/**
 *
 */
export default class RegisterForm extends React.Component {
  /**
  * Instantiates an instance of a React Component for Registration
  *
  */
  constructor() {
    super();

    this.state = {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
      registering: false,
      errorMessage: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

/**
 * @memberof RegisterComponent
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
   * @memberof RegisterComponent
   * @returns {void}
   * @param {*} event
   */
  handleSubmit(event) {
    event.preventDefault();
    if (this.state.password === this.state.confirmPassword) {
      registerAction({
        userName: this.state.userName,
        password: this.state.password,
        email: this.state.email
      });
      this.setState({
        registering: true,
        errorMessage: ''
      });
    }
  }

  /**
   * onChange method callback for error store
   * @return {void}
   */
  onChange() {
    const registerError = ErrorStore.getRegisterError();
    if (registerError) {
      this.setState({
        errorMessage: registerError,
        registering: false
      });
    }
  }

  /**
   * add change listener from ErrorStore
   * @memberof RegisterComponent
   * @return {void}
   */
  componentDidMount() {
    ErrorStore.addChangeListener(this.onChange);
  }

  /**
   * removes change listener from ErrorStore
   * @memberof RegisterComponent
   * @return {void}
   */
  componentWillUnmount() {
    ErrorStore.removeChangeListener(this.onChange);
  }

/**
 * @memberof RegisterComponent
 * @returns {void}
 */
  render() {
    return (
       <form className = 'inputform'>
        <input
        name = 'userName'
        placeholder = 'username'
        type = 'text'
        autoComplete ='off'
        value = {this.state.userName}
        onChange = {this.handleChange}
        />
        <input
        name = 'email'
        placeholder = 'email'
        type = 'text'
        autoComplete ='off'
        value = {this.state.email}
        onChange = {this.handleChange}
        />
        <input
        name = 'password'
        placeholder = 'password'
        type = 'password'
        autoComplete ='off'
        value = {this.state.password}
        onChange = {this.handleChange}
        /> {this.state.password.length < 6 ? <FaSquareO /> : <FaCheckSquareO />}
        <input
        name = 'confirmPassword'
        placeholder = 'confirmpassword'
        type = 'password'
        autoComplete ='off'
        value = {this.state.confirmPassword}
        onChange = {this.handleChange}
        /> {this.state.password !== this.state.confirmPassword || this.state.password.length
        < 6 ? <FaSquareO /> : <FaCheckSquareO />}
        <button
        className = 'button'
        type = 'submit'
        disabled = { !this.state.userName || !this.state.email ||
         !this.state.password || !this.state.confirmPassword }
         onClick = {this.handleSubmit}
         >
        Register {this.state.registering && <FaSpinner className="fa fa-spinner fa-spin"/>}
        </button>

        {this.state.errorMessage &&
          <div className="error-login-register">
            <FaExclamationTriangle /> {this.state.errorMessage}
          </div>
          }
      </form>
    );
  }
}

