import React from 'react';
import { mount } from 'enzyme';
import SignOutAction from 'SignOutAction';    // eslint-disable-line
import HeaderView from '../views/Header.jsx';

/* global jest localStorage window */

Object.defineProperty(window, 'localStorage', { value: jest.fn() });
localStorage.getItem = jest.fn();
localStorage.setItem = jest.fn();

jest.mock('SignOutAction', () => jest.fn());

describe('HeaderView', () => {
  let mountedComponent;
  let props;
  const headerView = () => {
    if (!mountedComponent) {
      mountedComponent = mount(
        <HeaderView {...props} />
      );
    }
    return mountedComponent;
  };

  beforeEach(() => {
    mountedComponent = undefined;
    props = {
      username: 'test user',
      signOutHandler: jest.fn()
    };
  });

  it('should render header view', () => {
    expect(headerView()).toBeDefined();
  });

  it('should render with the right props', () => {
    const component = headerView();
    const componentProps = component.props();
    expect(componentProps.username).toEqual('test user');
    expect(Object.keys(componentProps).length).toBe(2);
  });
});
