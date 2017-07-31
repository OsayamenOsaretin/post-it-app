import React from 'react';
import { shallow } from 'enzyme';
import AcceptRejectAction from 'AcceptRejectGroupAction';
import RequestItemView from '../views/GroupContainer/RequestItem.jsx';

/* global jest */
jest.mock('AcceptRejectGroupAction', () => jest.fn());

describe('AcceptRejectGroupView', () => {
  let mountedComponent;
  const acceptRejectView = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(
        <RequestItemView />
      );
    }
  };

  beforeEach(() => {
    mountedComponent = undefined;
  });

  it('should render', () => {
    expect(acceptRejectView()).toBeDefined();
  });

  it('should render divs and two buttons', () => {
    const component = acceptRejectView();
    const div = component.find('div');
    const buttons = component.find('button');
    expect(div.length).toBeGreaterThan(0);
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('should call accept reject action with right arguments when accept button is clicked', () => {
    const component = acceptRejectView();
    const acceptButton = component.find('.accept-button').first();
    acceptButton.simulate('click');
    expect(AcceptRejectAction).toHaveBeenCalledWith({
      status: true
    });
  });

  it('should call accept reject action with right arguments when reject button clicked', () => {
    const component = acceptRejectView();
    const rejectButton = component.find('.reject-button').first();
    rejectButton.simulate('click');
    expect(AcceptRejectAction.mock).toHaveBeenCalledWith({
      status: false
    });
  });
});
