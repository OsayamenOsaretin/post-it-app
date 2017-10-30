import React from 'react';
import { mount } from 'enzyme';
import SendMessageView from
  '../../views/GroupContainer/GroupBodyContainer/SendMessageView.jsx';
import SendMessageAction from 'SendMessageAction';   // eslint-disable-line

/* global jest window localStorage */

Object.defineProperty(window, 'localStorage', { value: jest.fn() });
jest.mock('SendMessageAction', () => jest.fn());

describe('SendMessageView', () => {
  let mountedComponent;
  const sendMessageView = () => {
    if (!mountedComponent) {
      mountedComponent = mount(
        <SendMessageView />
      );
    }
    return mountedComponent;
  };

  beforeEach(() => {
    mountedComponent = undefined;
  });

  it('should render', () => {
    expect(sendMessageView()).toBeDefined();
  });

  it('should change state when input changes', () => {
    const component = sendMessageView();
    const input = component.find('input').first();
    input.simulate('change', {
      target: { value: 'test message' }
    });
    expect(component.state().message).toBe('test message');
  });

  it('should call send message action when button clicked', () => {
    const component = sendMessageView();
    localStorage.getItem = jest.fn();
    const input = component.find('input').first();
    input.simulate('change', {
      target: { value: 'test message' }
    });
    const button = component.find('button');
    button.simulate('click');
    expect(SendMessageAction.mock.calls.length).toBe(1);
  });

  it('should not take props', () => {
    const component = sendMessageView();
    expect(Object.keys(component.props()).length).toBe(0);
  });
});
