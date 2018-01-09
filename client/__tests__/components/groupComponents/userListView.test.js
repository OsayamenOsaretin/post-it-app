import React from 'react';
import { mount } from 'enzyme';
import UserListView from
  '../../../src/views/GroupContainer/GroupBodyContainer/userListView.jsx';
import UserListAction from 'UserListAction';    // eslint-disable-line

/* global jest */

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

  const users = {
    entrySeq: () => ([])
  };


  const handleStatusChange = jest.fn();

  beforeEach(() => {
    mountedComponent = undefined;
    props = {
      users,
      handleStatusChange
    };
  });

  it('should successfully mount component', () => {
    expect(userListView()).toBeDefined();
  });

  it('should call add user action when option selct', () => {
    const component = userListView();
    const select = component.find('select');
    select.simulate('change');
    expect(UserListAction.mock.calls.length).toBe(1);
  });

  it('should mount with the right props', () => {
    const component = userListView();
    const componentProps = component.instance().props;
    expect(componentProps).toEqual({
      users,
      handleStatusChange
    });
  });
});
