import React from 'react';
import PropTypes from 'prop-types';

/**
 *
 */
class FormInput extends React.Component {

 /**
  *
  * @param {*} props
  */
  constructor(props) {
    super(props);

    this.state = {
      fieldInput: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }
/**
 * @returns {void}
 * @param {*} event
 */
  handleChange(event) {
    const value = event.target.value;

    this.setState(() => ({
      fieldInput: value,
    })
    );

    this.props.handleChange(this.state.fieldInput, this.props.label);
  }

/**
 * renders the Form input field component
 * @returns {void}
 * @memberof FormInput
 */
  render() {
    return (
      <div className = "inputField">
      <input
      id = 'formInput'
      placeholder = {this.props.label}
      type ='text'
      autoComplete = 'off'
      value = {this.state.fieldInput}
      onChange = {this.handleChange} />

      </div>
    );
  }
}

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

module.exports = FormInput;
