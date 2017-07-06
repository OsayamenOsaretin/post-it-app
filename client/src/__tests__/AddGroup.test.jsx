import React from 'react';
import { mount } from 'enzyme';
import GroupAction from 'GroupAction';
import AddGroup from '../views/GroupContainer/AddGroup.jsx';


// let addFunction = GroupAction.addGroupApi;

jest.mock('GroupAction', () => jest.fn());

describe('AddGroup', () => {
  let mountedComponent;
  const addGroup = () => {
    if (!mountedComponent) {
      mountedComponent = mount(
        <AddGroup />
      );
    }
    return mountedComponent;
  };

  beforeEach(() => {
    mountedComponent = undefined;
  });

  it('should render', () => {
    const component = addGroup();
    expect(component).toBeDefined();
  });

  it('should update state on input field change', () => {
    const input = addGroup().find('input').first();
    input.simulate('change', { target: {
      value: 'test Group'
    } });
    expect(addGroup().state().fieldInput).toBe('test Group');
  });

  it('should call add group action when button is clicked', () => {
    GroupAction.addGroupApi = jest.fn();
    const component = addGroup();
    const button = component.find('button').first();
    const input = component.find('input').first();
    input.simulate('change', { target: {
      value: 'test Group'
    } });
    button.simulate('click');
    expect(GroupAction.addGroupApi.mock.calls.length).toBe(1);
  });
});
