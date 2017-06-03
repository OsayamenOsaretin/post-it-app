import React from 'react';
import FormField from './FormInput';
import PostItActions from '../data/PostItActions';

class LoginForm extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      password: '',
      email: '',
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(inputFieldState, label){
    this.setState(function (){
      return {
        label: inputFieldState
      }
    });
  }

  handleSubmit()

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
    )
  }
}



