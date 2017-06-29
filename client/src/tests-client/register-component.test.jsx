import React from 'react';
import { mount } from 'enzyme';

import RegisterForm from '../views/LoginRegisterContainer/RegisterComponent.jsx';


describe('RegisterComponent', () => {
  let mountedRegisterComponent;
  const registerComponent = () => {
    if (!mountedRegisterComponent) {
      mountedRegisterComponent = mount(
        <RegisterForm />
      );
    }
    return mountedRegisterComponent;
  };

  beforeEach(() => {
    mountedRegisterComponent = undefined;
  });

  it('does not recieve any props', () => {
    expect(registerComponent().props().length).toBe(undefined);
  });

  it('always renders a form', () => {
    const form = registerComponent().find('form');
    expect(form.length).toBe(1);
  });

  it('always renders 4 input fields', () => {
    const inputs = registerComponent().find('input');
    expect(inputs.length).toBe(4);
  });

  it('always renders a button', () => {
    const button = registerComponent().find('button');
    expect(button.length).toBe(1);
  });

  it('first input field should update username state', () => {
    const inputs = registerComponent().find('input');
    const usernameInput = inputs.first();
    usernameInput.simulate('change', { target: { value: 'username', name: 'userName' } });
    expect(registerComponent().state().userName).toBe('username');
  });

  it('second input field should update email state', () => {
    const inputs = registerComponent().find('input');
    const emailInput = inputs.at(1);
    emailInput.simulate('change',
    { target: { value: 'testing@email.com', name: 'email' } });
    expect(registerComponent().state().email).toBe('testing@email.com');
  });

  it('third input field should update password state', () => {
    const inputs = registerComponent().find('input');
    const passwordInput = inputs.at(2);
    passwordInput.simulate('change',
    { target: { value: 'supersecretpassword', name: 'password' } });
    expect(registerComponent().state().password).toBe('supersecretpassword');
  });

  it('fourth input field should update confirmpassword state', () => {
    const inputs = registerComponent().find('input');
    const confirmPasswordInput = inputs.at(3);
    confirmPasswordInput.simulate('change',
    { target: { value: 'supersecretpassword', name: 'confirmPassword' } });
    expect(registerComponent().state().confirmPassword).toBe('supersecretpassword');
  });
});
