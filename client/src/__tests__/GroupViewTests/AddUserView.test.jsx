import React from 'react';
import { mount } from 'enzyme';
import AllUsersStore from 'AllUsersStore';
import AddUserView from '../views/GroupContainer/GroupBodyContainer/AddUserView.jsx';
/* global jest */

const mockUser = {
  get: jest.genMockFunction()
};
jest.mock('AllUsersStore', () => {
  return {
    getUsers: () => (
      [mockUser]
    ),
    addChangeListener: jest.genMockFunction(),
    removeChangeListener: jest.genMockFunction()
  };
});

describe('AddUserView', () => {
  let mountedComponent;
  let props;

  const addUserView = () => {
    if (!mountedComponent) {
      mountedComponent = mount(
        <AddUserView {...props}/>
      );
    }
    return mountedComponent;
  };

  beforeEach(() => {
    mountedComponent = undefined;
    props = {
      groupId: 'testGroupId'
    };
  });

  it('should render', () => {
    expect(addUserView()).toBeDefined();
  });

  it('should recieve props', () => {
    expect(Object.keys(addUserView().props()).length).toBeGreaterThan(0);
  });

  it('should render a user list view', () => {
    const component = addUserView();
    const userListView = component.find('UserListView');

    expect(userListView).toBeDefined();
  });

  it('should attach all user store event listener when component mounts', () => {
    // const UserStoreSpy = spyOn(AllUsersStore, 'addChangeListener');
    // const node = document.createElement('div');
    // ReactDOM.render(<AddUserView groupId='testGroupId'/>, node);
    addUserView();
    expect(AllUsersStore.addChangeListener).toHaveBeenCalled();
  });

  it('should remove listener from all user store on component dismount', () => {
    const component = addUserView();
    component.unmount();
    expect(AllUsersStore.removeChangeListener).toHaveBeenCalled();
  });
});
