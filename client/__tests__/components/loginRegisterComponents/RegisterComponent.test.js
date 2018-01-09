import React from 'react';
import { mount } from 'enzyme';
import RegisterAction from 'RegisterAction';  // eslint-disable-line
import RegisterForm from
  '../../../src/views/LoginRegisterContainer/RegisterComponent.jsx';

/* global jest */
jest.mock('RegisterAction', () => jest.fn());

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
    RegisterAction.mockClear();
    mountedRegisterComponent = undefined;
  });

  it('should always render a form', () => {
    const form = registerComponent().find('form');
    expect(form.length).toBe(1);
  });

  it('should always render 4 input fields', () => {
    const inputs = registerComponent().find('input');
    expect(inputs.length).toBe(5);
  });

  it('should always render a button', () => {
    const button = registerComponent().find('button');
    expect(button.length).toBe(1);
  });

  it('should update username state in the first input field', () => {
    const inputs = registerComponent().find('input');
    const usernameInput = inputs.first();
    usernameInput.simulate('change',
      { target: { value: 'username', name: 'userName' } });
    expect(registerComponent().state().userName).toBe('username');
  });

  it('should update email state in second input field', () => {
    const inputs = registerComponent().find('input');
    const emailInput = inputs.at(1);
    emailInput.simulate('change',
      { target: { value: 'testing@email.com', name: 'email' } });
    expect(registerComponent().state().email).toBe('testing@email.com');
  });

  it('should update password state in the third input field', () => {
    const inputs = registerComponent().find('input');
    const passwordInput = inputs.at(2);
    passwordInput.simulate('change',
      { target: { value: 'supersecretpassword', name: 'password' } });
    expect(registerComponent().state().password).toBe('supersecretpassword');
  });

  it('should update confirmpassword state with the fourth input field', () => {
    const inputs = registerComponent().find('input');
    const confirmPasswordInput = inputs.at(3);
    confirmPasswordInput.simulate('change',
      { target: { value: 'supersecretpassword', name: 'confirmPassword' } });
    expect(registerComponent()
      .state()
      .confirmPassword)
      .toBe('supersecretpassword');
  });

  it('should have disabled button when any of the fields is not filled', () => {
    const button = registerComponent().find('button').first();
    expect(button.prop('disabled')).toBeTruthy();
  });

  it('should call register action when password and confirm password are equal',
    () => {
      const component = registerComponent();
      const button = component.find('button').first();
      const inputs = component.find('input');
      inputs.first().simulate('change',
        { target: { value: 'tester', name: 'userName' } });
      inputs.at(1).simulate('change',
        { target: { value: 'testing@email.com', name: 'email' } });
      inputs.at(2).simulate('change',
        { target: { value: 'supersecretpassword', name: 'password' } });
      inputs.at(3).simulate('change',
        { target: { value: 'supersecretpassword', name: 'confirmPassword' } });
      button.simulate('click');
      expect(RegisterAction.mock.calls.length).toBe(1);
    });

  it('shouldnt call register action when password & confirm password not equal',
    () => {
      const component = registerComponent();
      const button = component.find('button').first();
      const inputs = component.find('input');
      inputs.first().simulate('change',
        { target: { value: 'tester', name: 'userName' } });
      inputs.at(1).simulate('change',
        { target: { value: 'testing@email.com', name: 'email' } });
      inputs.at(2).simulate('change',
        { target: { value: 'supersecretpassword', name: 'password' } });
      inputs.at(3).simulate('change',
        { target:
          { value: 'notsupersecretpassword', name: 'confirmPassword' } });
      button.simulate('click');
      expect(RegisterAction.mock.calls.length).toBe(0);
    });
});
