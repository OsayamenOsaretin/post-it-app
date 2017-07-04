import React from 'react';
import { mount } from 'enzyme';
import UserListView from '../views/GroupContainer/GroupBodyContainer/userListView.jsx';
import UserListAction from 'UserListAction';

jest.mock('UserListAction', () => jest.fn());

describe('UserListView ', () => {
  let mountedComponent;
  let props;
  const userListView = () => {
    if (!mountedComponent) {
      mountedComponent = mount(
        <UserListView {...props}/>
      );
    }
    return mountedComponent;
  };

  beforeEach(() => {
    mountedComponent = undefined;
    props = {
      users: []
    };
  });

  it('should render', () => {
    expect(userListView()).toBeDefined();
  });

  it('should call add user action when option selct', () => {
    const component = userListView();
    const select = component.find('select');
    select.simulate('change');
    expect(UserListAction.mock.calls.length).toBe(1);
  });

  it('should take props', () => {
    const component = userListView();
    expect(Object.keys(component.props()).length).toBeGreaterThan(0);
  });
});
