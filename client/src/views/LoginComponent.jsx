import { Component } from 'react';
import { FormField } from './FormInput';
import signInAction from '../data/postItActions/userSignInAction';


/**
 *
 */
export default class LoginForm extends Component {
  /**
  *
  * @param {*} props
  */
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.onHandleSubmit = this.handleSubmit.bind(this);
  }
/**
 * @memberof LoginComponent
 * @returns {void}
 * @param {String} inputFieldState
 * @param {String} label
 */
  handleChange(inputFieldState, label) {
    if (label === 'password') {
      this.setState(() => ({
        password: inputFieldState
      }));
    } else {
      this.setState(() => ({
        email: inputFieldState
      })
    );
    }
  }

  /**
   * @memberof LoginComponent
   * @returns {void}
   */
  onHandleSubmit() {
    signInAction(this.state);
  }



/**
 * @memberof LoginComponent
 * @returns {void}
 */
  render() {
    return (
      <form className = 'inputform' onSubmit = { this.handleSubmit }>
        <FormField
        label = "email"
        handleChange = { this.handleChange }/>
        <FormField
        label="password"
        handleChange = { this.handleChange }/>

        <button
        className = 'button'
        type = 'submit'
        disabled = { !this.state.username || !this.state.email }>
        Log in
        </button>
      </form>
    );
  }
}
