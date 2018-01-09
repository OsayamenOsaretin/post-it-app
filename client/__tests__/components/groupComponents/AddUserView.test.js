import React from 'react';
import { mount } from 'enzyme';
import AllUsersStore from 'AllUsersStore';      // eslint-disable-line
import AddUserView from
  '../../../src/views/GroupContainer/GroupBodyContainer/AddUserView.jsx';

/* global jest */

const mockUser = {
  get: jest.genMockFunction(),
  entrySeq: () => (
    []
  )
};
jest.mock('AllUsersStore', () => (
  {
    getUsers: () => (
      mockUser
    ),
    addChangeListener: jest.genMockFunction(),
    removeChangeListener: jest.genMockFunction()
  }
));

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

  it('should sucessfully mount the component', () => {
    expect(addUserView()).toBeDefined();
  });

  it('should mount with the right props', () => {
    expect(addUserView().props().groupId).toBe('testGroupId');
  });

  it('should render a user list view', () => {
    const component = addUserView();
    const userListView = component.find('UserListView');

    expect(userListView).toBeDefined();
  });

  it('should attach all user store event listener when component mounts',
    () => {
      addUserView();
      expect(AllUsersStore.addChangeListener).toHaveBeenCalled();
    });

  it('should remove listener from all user store on component dismount', () => {
    const component = addUserView();
    component.unmount();
    expect(AllUsersStore.removeChangeListener).toHaveBeenCalled();
  });
});
