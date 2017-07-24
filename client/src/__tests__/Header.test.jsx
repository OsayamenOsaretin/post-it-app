import React from 'react';
import { mount } from 'enzyme';
import SignOutAction from 'SignOutAction';
import HeaderView from '../views/Header.jsx';

/* global jest localStorage window */

Object.defineProperty(window, 'localStorage', { value: jest.fn() });
localStorage.getItem = jest.fn();
localStorage.setItem = jest.fn();

jest.mock('SignOutAction', () => jest.fn());

describe('HeaderView', () => {
  let mountedComponent;
  const headerView = () => {
    if (!mountedComponent) {
      mountedComponent = mount(
        <HeaderView />
      );
    }
    return mountedComponent;
  };

  beforeEach(() => {
    mountedComponent = undefined;
  });

  it('should render header view', () => {
    expect(headerView()).toBeDefined();
  });

  it('should call sign out action on button click', () => {
    const component = headerView();
    const signOutButton = component.find('button').first();
    signOutButton.simulate('click');
    expect(SignOutAction.mock.calls.length).toBeGreaterThan(0);
  });
});
