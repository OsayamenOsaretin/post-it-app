import React from 'react';
import { mount } from 'enzyme';
import SignInAction from 'SignInAction';
import LoginComponent from '../views/LoginRegisterContainer/LoginComponent.jsx';

jest.mock('SignInAction', () => jest.fn());

describe('LoginComponent', () => {
  let mountedLoginComponent;
  const loginComponent = () => {
    if (!mountedLoginComponent) {
      mountedLoginComponent = mount(
        <LoginComponent />
      );
    }
    return mountedLoginComponent;
  };

  beforeEach(() => {
    mountedLoginComponent = undefined;
  });

  // tests go here
  it('does not recieve any props', () => {
    expect(loginComponent().props().length).toBe(undefined);
  });

  it('always renders a form', () => {
    const form = loginComponent().find('form');
    expect(form.length).toBe(1);
  });

  it('always render two input fields', () => {
    const inputs = loginComponent().find('input');
    expect(inputs.length).toBe(2);
  });

  it('always renders a button', () => {
    const button = loginComponent().find('button');
    expect(button.length).toBe(1);
  });

  it('first input field should update email state', () => {
    const inputs = loginComponent().find('input');
    const emailInput = inputs.first();
    emailInput.simulate('change', { target: { value: 'testing@email.com', name: 'email' } });
    expect(loginComponent().state().email).toBe('testing@email.com');
  });

  it('second input field should update password state', () => {
    const inputs = loginComponent().find('input');
    const passwordInput = inputs.at(1);
    passwordInput.simulate('change',
    { target: { value: 'supersecretpassword', name: 'password' } });
    expect(loginComponent().state().password).toBe('supersecretpassword');
  });

  it('should have a disabled button when email and password are not entered', () => {
    const button = loginComponent().find('button').first();
    expect(button.prop('disabled')).toBeTruthy();
  });

  it('should call sign in action when button is clicked', () => {
    const component = loginComponent();
    const button = component.find('button').first();
    const inputs = component.find('input');
    inputs.first().simulate('change', { target: { value: 'testing@email.com', name: 'email' } });
    inputs.at(1).simulate('change',
    { target: { value: 'supersecretpassword', name: 'password' } });
    button.simulate('click');
    expect(SignInAction.mock.calls.length).toBe(1);
  });
});
