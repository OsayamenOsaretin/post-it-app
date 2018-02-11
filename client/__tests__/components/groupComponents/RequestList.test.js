import React from 'react';
import { mount } from 'enzyme';
import RequestListView from '../../../src/views/GroupContainer/RequestList.jsx';
import RequestStore from 'RequestStore';  // eslint-disable-line

/* global jest */

jest.mock('../../../src/stores/GroupRequestStore', () => {
  let requests = {
    get: jest.genMockFunction(),
    entrySeq: () => (
      [['firstRequest', {
        get: () => ('testName')
      }], ['secondRequest', {
        get: () => ('secondTestName')
      }]]
    ),
    size: 2
  };
  const emptyRequests = () => {
    requests = [];
  };
  return {
    getRequests: () => (
      requests
    ),
    emptyRequests,
    addChangeListener: jest.fn(),
    removeChangeListener: jest.fn()
  };
});

describe('RequestList', () => {
  let mountedComponent;
  let props;
  const requestListView = () => {
    if (!mountedComponent) {
      mountedComponent = mount(
        <RequestListView {...props}/>
      );
    }
    return mountedComponent;
  };

  beforeEach(() => {
    props = {
      groupId: 'testGroupId'
    };
    mountedComponent = undefined;
  });

  it('should mount component successfully', () => {
    expect(requestListView()).toBeDefined();
  });

  it('should mount with the right props', () => {
    const component = requestListView();
    const groupIdProp = component.instance().props.groupId;
    expect(groupIdProp).toBe('testGroupId');
  });

  it('should add event listener on component mount', () => {
    const spyOnEvent = spyOn(RequestStore, 'addChangeListener');
    requestListView();
    expect(spyOnEvent).toHaveBeenCalled();
  });

  it('should remove event listener on component unmount', () => {
    const spyOnEvent = spyOn(RequestStore, 'removeChangeListener');
    const component = requestListView();
    component.unmount();
    expect(spyOnEvent).toHaveBeenCalled();
  });

  it('should render request items if they are more than one', () => {
    const component = requestListView();
    const requestView = component.find('.group-list-item');
    expect(requestView.length).toBe(2);
  });

  it('should not render request items if they are less than 1', () => {
    RequestStore.emptyRequests();
    const component = requestListView();
    const requestView = component.find('.group-list-item');
    expect(requestView.length).toBe(0);
  });
});
