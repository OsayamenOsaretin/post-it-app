import React from 'react';
import FormField from './FormInput'

class RegisterForm extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(inputFieldState, label){
    this.setState(function (){
      return {
        label: inputFieldState,
      }
    });
  }

  handleSubmit()

  render() {
    return(
       <form className = 'inputform' onSubmit = { this.handleSubmit }>
        <FormField
        label = 'username'
        handleChange = {this.handleChange} />
        <FormField 
        label = "email"
        handleChange = { this.handleChange }/>
        <FormField 
        label="password"
        handleChange = { this.handleChange }/>
        <FormField
        label='confirmPassword'
        handleChange = { this.hnaldeChange} />

        <button
        className = 'button'
        type = 'submit'
        disabled = { !this.state.username || !this.state.email }>
        Log in
        </button>
      </form>
    )
  }
}