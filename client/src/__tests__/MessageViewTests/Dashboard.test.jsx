import React from 'react';
import { mount } from 'enzyme';
// import socket from 'socket.io-client';
import GroupStore from 'GroupStore';
import Dashboard from '../views/GroupContainer/Dashboard.jsx';

/* global jest localStorage window */

Object.defineProperty(window, 'localStorage', { value: jest.fn() });
localStorage.getItem = jest.fn();
localStorage.setItem = jest.fn();

jest.mock('socket.io-client');
jest.mock('GroupStore');

describe('Dashboard', () => {
  let mountedComponent;

  const dashboard = () => {
    if (!mountedComponent) {
      mountedComponent = mount(
        <Dashboard />
      );
    }
    return mountedComponent;
  };

  beforeEach(() => {
    mountedComponent = undefined;
  });

  it('should render', () => {
    expect(dashboard()).toBeDefined();
  });

  it('should render a header view', () => {
    const component = dashboard();
    const headerView = component.find('HeaderView');
    expect(headerView).toBeDefined();
  });

  it('should render a GroupListView', () => {
    const component = dashboard();
    const groupListView = component.find('GroupListView');
    expect(groupListView).toBeDefined();
  });

  it('should attach event listener on component mount', () => {
    const spyEvent = spyOn(GroupStore, 'addChangeListener');
    dashboard();
    expect(spyEvent).toHaveBeenCalled();
  });

  it('should remove event listener on component unmount', () => {
    const spyEvent = spyOn(GroupStore, 'removeChangeListener');
    const component = dashboard();
    component.unmount();
    expect(spyEvent).toHaveBeenCalled();
  });
});
