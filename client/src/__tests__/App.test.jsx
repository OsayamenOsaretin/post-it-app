import React from 'react';
import { mount, shallow } from 'enzyme';
import UserStore from 'UserStore';
import AppView from '../views/App.jsx';

/* global jest localStorage window */

Object.defineProperty(window, 'localStorage', { value: jest.fn() });
localStorage.getItem = jest.fn();
localStorage.setItem = jest.fn();

jest.mock('UserStore', () => (
  {
    getSignedInState: jest.genMockFunction(),
    addChangeListener: jest.genMockFunction(),
    removeChangeListener: jest.genMockFunction()
  }
));

describe('AppView', () => {
  let mountedComponent;
  const appView = () => {
    if (!mountedComponent) {
      mountedComponent = mount(
        <AppView />
      );
    }
    return mountedComponent;
  };

  const shallowAppView = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(
        <AppView />
      );
    }
    return mountedComponent;
  };

  beforeEach(() => {
    mountedComponent = undefined;
  });

  it('should render', () => {
    expect(appView()).toBeDefined();
  });

  it('should render a switch and routes', () => {
    const component = shallowAppView();
    const switchComponent = component.find('Switch');
    const routeComponents = component.find('Route');

    expect(switchComponent.length).toBeGreaterThan(0);
    expect(routeComponents.length).toBeGreaterThan(0);
  });

  it('should render a password recovery button when no token and no password reset', () => {
    const component = appView();
    component.setState({
      token: undefined,
      passwordReset: true
    });
    const passwordRecoveryButton = component.find('.forgot-password-button');
    expect(passwordRecoveryButton).toBeDefined();
  });

  it('should render a reset password component when recovery button is clicked', () => {
    const component = appView();
    component.setState({
      token: undefined,
      passwordReset: true,
      redirect: false
    });
    const passwordRecoveryButton = component.find('.forgot-password-button').first();
    passwordRecoveryButton.simulate('click');
    const resetPasswordComponent = component.find('ResetPasswordComponent');
    expect(resetPasswordComponent).toBeDefined();
  });

  it('should render a message when message has been sent', () => {
    const component = appView();
    component.setState({
      token: undefined,
      messageSent: true,
      passwordReset: false
    });
    const returnMessage = component.find('.password-sent-message');
    expect(returnMessage).toBeDefined();
  });

  it('should attach an event listener when component mounts', () => {
    appView();
    expect(UserStore.addChangeListener).toHaveBeenCalled();
  });

  it('should remove event listener when component dismounts', () => {
    const component = appView();
    component.unmount();
    expect(UserStore.removeChangeListener).toHaveBeenCalled();
  });
});

