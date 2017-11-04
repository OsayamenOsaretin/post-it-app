import React from 'react';
import { shallow } from 'enzyme';
import GroupListView from '../../views/GroupContainer/GroupListView.jsx';
import BulkMessageRequest from 'BulkMessageRequest'; // eslint-disable-line

/* global jest */

jest.mock('socket.io-client');
jest.mock('../../utility/bulkMessageRequest', () => jest.fn());
jest.mock('BulkMessageRequest');

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

  it('should render a switch and routes', () => {
    const component = groupListView();
    const switchView = component.find('Switch');
    const routesView = component.find('Route');

    expect(switchView).toBeDefined();
    expect(routesView).toBeDefined();
  });
});
