import React from 'react';
import { shallow } from 'enzyme';
import MessageListView from
  '../../views/GroupContainer/GroupBodyContainer/MessageListView.jsx';

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

  beforeEach(() => {
    props = {
      messages: {
        valueSeq: () => [
          ['first', {
            sender: 'testSender'
          }]
        ]
      }
    };
    mountedComponent = undefined;
  });

  it('should render', () => {
    expect(messageList()).toBeDefined();
  });

  it('should take props', () => {
    const component = messageList();

    expect(Object.keys(component.props()).length).toBeGreaterThan(0);
  });
});
