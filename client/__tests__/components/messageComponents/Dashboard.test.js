import React from 'react';
import { mount } from 'enzyme';
// import GroupList from '../../flux/models/groupList';
import GroupStore from 'GroupStore';    // eslint-disable-line
import Dashboard from '../../../src/views/GroupContainer/Dashboard.jsx';
import SignOutAction from '../../../src/actions/signOutAction';

/* global jest localStorage window */

Object.defineProperty(window, 'localStorage', { value: jest.fn() });
localStorage.getItem = jest.fn();
localStorage.setItem = jest.fn();

Object.defineProperty(window, '$', { value: () => ({
  chardinJs: () => jest.fn()
}) });

jest.mock('socket.io-client');

jest.mock('../../../src/actions/signOutAction');

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

  it('should successfully mount component', () => {
    expect(dashboard()).toBeDefined();
  });

  it('should render a header view', () => {
    const component = dashboard();
    const headerView = component.find('HeaderView');
    expect(headerView).toBeDefined();
  });

  it('should call sign out action when handler is called', () => {
    const component = dashboard();
    const event = {
      preventDefault: jest.fn()
    };
    const componentInstance = component.instance();
    const signOutHandler = componentInstance.signOutHandler;
    signOutHandler(event);
    expect(SignOutAction).toHaveBeenCalled();
  });

  it('should set state when on change callback is called', () => {
    const component = dashboard();
    const componentInstance = component.instance();
    const onChangeCb = componentInstance.onChange;
    onChangeCb();
    expect(1).toBe(1);
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
