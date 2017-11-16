import React from 'react';
import { mount } from 'enzyme';
import GoogleSignInComponent from
  '../../../src/views/LoginRegisterContainer/GoogleSignInComponent.jsx';


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

  it('should successfully mount component', () => {
    expect(googleSignIn()).toBeDefined();
  });

  it('should render a google sign in div', () => {
    const component = googleSignIn();
    const signInDiv = component.find('.google-signin');
    expect(signInDiv).toBeDefined();
  });
});
