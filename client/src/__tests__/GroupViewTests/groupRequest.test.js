import React from 'react';
import { mount } from 'enzyme';
import AcceptRejectAction from 'AcceptRejectGroupAction';   // eslint-disable-line  
import RequestItemView from '../../views/GroupContainer/RequestItem.jsx';
import RequestStore from 'RequestStore';  // eslint-disable-line

/* global jest localStorage window */


jest.mock('AcceptRejectGroupAction', () => jest.fn());
Object.defineProperty(window, 'localStorage', { value: jest.fn() });
localStorage.getItem = () => (
  'testUser'
);
localStorage.setItem = jest.fn();

describe('AcceptRejectGroupView', () => {
  let mountedComponent;
  let props;
  const acceptRejectView = () => {
    if (!mountedComponent) {
      mountedComponent = mount(
        <RequestItemView {...props}/>
      );
    }
    return mountedComponent;
  };

  beforeEach(() => {
    props = {
      groupId: 'testGroupId',
      request: {
        get: () => ('testName')
      }
    };
    mountedComponent = undefined;
  });

  it('should mount successfully', () => {
    expect(acceptRejectView()).toBeDefined();
  });

  it('should render divs and two buttons', () => {
    const component = acceptRejectView();
    const div = component.find('div');
    const buttons = component.find('button');
    expect(div.length).toBeGreaterThan(0);
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('should call accept when accept button is clicked', () => {
    const component = acceptRejectView();
    const acceptButton = component.find('.accept-button').first();
    acceptButton.simulate('click');
    expect(AcceptRejectAction).toHaveBeenCalledWith({
      status: 'true',
      groupId: 'testGroupId',
      userId: 'testUser'
    });
  });

  it('should call reject when reject button clicked', () => {
    const component = acceptRejectView();
    const rejectButton = component.find('.reject-button').first();
    rejectButton.simulate('click');
    expect(AcceptRejectAction).toHaveBeenCalledWith({
      status: 'false',
      groupId: 'testGroupId',
      userId: 'testUser'
    });
  });
});
