import React from 'react';
import { mount } from 'enzyme';
// import GroupAction from 'GroupAction'; // eslint-disable-line
import addGroupAction from '../../flux/actions/addGroup';
import AddGroupView from '../../views/GroupContainer/AddGroup.jsx';

/* global jest window localStorage */

jest.mock('../../flux/actions/addGroup');
Object.defineProperty(window, 'localStorage', { value: jest.fn() });
localStorage.getItem = () => (
  'testUser'
);
localStorage.setItem = jest.fn();

describe('AddGroup', () => {
  let mountedComponent;
  const addGroup = () => {
    if (!mountedComponent) {
      mountedComponent = mount(
        <AddGroupView />
      );
    }
    return mountedComponent;
  };

  beforeEach(() => {
    mountedComponent = undefined;
  });

  it('should successfully mount the component', () => {
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
    const component = addGroup();
    const button = component.find('button').first();
    const input = component.find('input').first();
    input.simulate('change', { target: {
      value: 'test Group'
    } });
    button.simulate('click');
    expect(addGroupAction).toHaveBeenCalled();
  });
});
