import React from 'react';
import { mount } from 'enzyme';
import RequestListView from '../views/GroupContainer/RequestList.jsx';
import RequestStore from 'RequestStore';

/* global jest */
jest.mock('RequestStore');

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

  it('should render', () => {
    expect(requestListView()).toBeDefined();
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

  it('should not render request items if they are less than 1', () => {
    const component = requestListView();
    // const requestListState = component.state().requests;
    const requestView = component.find('.request-item');
    expect(requestView.length).toBe(0);
  });

  it('should render request items if they are more than one', () => {
    const component = requestListView();
    // console.log(component);
    component.setState({
      requests: ['firstRequest']
    });
    const requestView = component.find('div.request-item');
    expect(requestView.length).toBe(1);
  });
});
