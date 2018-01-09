import React from 'react';
import { shallow } from 'enzyme';
import MessageListView from
  '../../../src/views/GroupContainer/GroupBodyContainer/MessageListView.jsx';

/* global localStorage window jest */

Object.defineProperty(window, 'localStorage', { value: jest.fn() });
localStorage.getItem = jest.fn();
localStorage.setItem = jest.fn();

describe('MessageListView', () => {
  let mountedComponent;
  let props;

  const messageList = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(
        <MessageListView {...props} />
      );
    }
    return mountedComponent;
  };

  const messages = {
    valueSeq: () => [
      ['first', {
        sender: 'testSender'
      }]
    ]
  };

  beforeEach(() => {
    props = {
      messages
    };
    mountedComponent = undefined;
  });

  it('should render successfully', () => {
    expect(messageList()).toBeDefined();
  });

  it('should take props', () => {
    const component = messageList();
    const componentProps = component.instance().props;
    expect(componentProps).toEqual({
      messages
    });
  });
});
