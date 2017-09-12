import React from 'react';
import { mount } from 'enzyme';
import GoogleSignInComponent from '../views/LoginRegisterContainer/GoogleSignInComponent.jsx';

/* global window */


describe('GoogleSignInComponent', () => {
  let mountedComponent;
  const googleSignIn = () => {
    if (!mountedComponent) {
      mountedComponent = mount(
        <GoogleSignInComponent />
      );
    }
    return mountedComponent;
  };

  beforeEach(() => {
    mountedComponent = undefined;
  });

  it('should render', () => {
    expect(googleSignIn()).toBeDefined();
  });

  it('should render a google sign in div', () => {
    const component = googleSignIn();
    const signInDiv = component.find('.google-signin');
    expect(signInDiv).toBeDefined();
  });

  it('should attach listener to window', () => {
    const spyOnWindow = spyOn(window, 'addEventListener');
    googleSignIn();
    expect(spyOnWindow).toHaveBeenCalled();
  });
});
