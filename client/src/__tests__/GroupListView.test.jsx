import React from 'react';
import { shallow } from 'enzyme';
import io from 'socket.io-client';
import GroupListView from '../views/GroupContainer/GroupListView.jsx';

/* global jest */

jest.mock('socket.io-client');
jest.mock('../utility/bulkMessageRequest', () => jest.fn());

describe('GroupListView', () => {
  let mountedComponent;
  let props;
  const groupListView = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(
        <GroupListView {...props} />
      );
    }
    return mountedComponent;
  };
  beforeEach(() => {
    mountedComponent = undefined;
    props = {
      groups: undefined,
      socket: io('http://balls.com')
    };
  });

  it('should render', () => {
    expect(groupListView()).toBeDefined();
  });

  it('should render a group list component', () => {
    const component = groupListView();
    const groupList = component.find('GroupList');

    expect(groupList).toBeDefined();
  });

  it('should take props', () => {
    const component = groupListView();

    expect(Object.keys(component.props()).length).toBeGreaterThan(0);
  });

  it('should attach listeners with socket.io', () => {
    const socketSpy = spyOn(props.socket, 'on');
    groupListView();
    expect(socketSpy).toHaveBeenCalled();
  });
});
