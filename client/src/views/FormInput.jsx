import React from 'react';

class FormInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fieldInput: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;

    this.setState(() => {
      return {
        fieldInput: value
      };
    });

    this.props.handleChange(this.state.fieldInput, this.props.label)
  }

  render(){
    return(
      <div className = "inputField">
      <input
      id = 'formInput'
      placeholder = {this.props.label}
      type ='text'
      autoComplete = 'off'
      value = {this.state.fieldInput}
      onChange = {this.handleChange} /> 

      </div>
    )
  }
}

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
}
