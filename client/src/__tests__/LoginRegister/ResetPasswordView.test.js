import React from 'react';
import { mount } from 'enzyme';
import ResetPasswordView from
  '../../views/LoginRegisterContainer/ResetPasswordView.jsx';
import ResetPasswordAction from 'ResetPasswordAction';    // eslint-disable-line
import UserStore from 'UserStore';    // eslint-disable-line

/* global jest localStorage window */

Object.defineProperty(window, 'localStorage', { value: jest.fn() });
localStorage.getItem = jest.fn();
localStorage.setItem = jest.fn();
jest.mock('ResetPasswordAction', () => jest.fn());
jest.mock('UserStore', () => (
  {
    addChangeListener: jest.genMockFunction(),
    removeChangeListener: jest.genMockFunction()
  }
));

describe('ResetPasswordView', () => {
  let mountedComponent;
  const resetPasswordView = () => {
    if (!mountedComponent) {
      mountedComponent = mount(
        <ResetPasswordView />
      );
    }
    return mountedComponent;
  };

  beforeEach(() => {
    mountedComponent = undefined;
  });

  it('should sucessfully render the component', () => {
    expect(resetPasswordView()).toBeDefined();
  });

  it('should render a div with a form', () => {
    const component = resetPasswordView();
    const divWithForm = component.find('.reset-form');
    const form = component.find('.inputForm');

    expect(divWithForm).toBeDefined();
    expect(form).toBeDefined();
  });

  it('should call reset password action on submit button click', () => {
    const component = resetPasswordView();
    const submitButton = component.find('.button').first();
    const inputField = component.find('input').first();
    inputField.simulate('change', { target: { value: 'testing@email.com' } });
    submitButton.simulate('click');
    expect(ResetPasswordAction.mock.calls.length).toBeGreaterThan(0);
  });

  it('should attach user store event listener', () => {
    const spyOnEventAttach = spyOn(UserStore, 'addChangeListener');
    resetPasswordView();
    expect(spyOnEventAttach).toHaveBeenCalled();
  });

  it('should detach user store event listener on unmount', () => {
    const spyOnEventAttach = spyOn(UserStore, 'removeChangeListener');
    const component = resetPasswordView();
    component.unmount();
    expect(spyOnEventAttach).toHaveBeenCalled();
  });
});

