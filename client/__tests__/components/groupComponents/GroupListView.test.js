import React from 'react';
import { shallow } from 'enzyme';
import GroupListView from '../../../src/views/GroupContainer/GroupListView.jsx';
import groupListMap from '../../../src/models/groupList';
import BulkMessageRequest from 'BulkMessageRequest'; // eslint-disable-line

/* global jest */

jest.mock('socket.io-client');
jest.mock('../../../src/utility/bulkMessageRequest', () => jest.fn());
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
  const groups = new groupListMap([['firstKey', new Map()],
    ['secondKey', new Map()]]);

  beforeEach(() => {
    mountedComponent = undefined;
    props = {
      groups
    };
  });

  it('should successfully mount component', () => {
    expect(groupListView()).toBeDefined();
  });

  it('should render a group list component', () => {
    const component = groupListView();
    const groupList = component.find('GroupList');

    expect(groupList).toBeDefined();
  });

  it('should render with the right props', () => {
    const component = groupListView();
    const groupProp = component.instance().props.groups;
    expect(groupProp).toBe(groups);
  });

  it('should render a switch and routes', () => {
    const component = groupListView();
    const switchView = component.find('Switch');
    const routesView = component.find('Route');

    expect(switchView).toBeDefined();
    expect(routesView).toBeDefined();
  });
});
