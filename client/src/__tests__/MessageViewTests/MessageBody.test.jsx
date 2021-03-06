import React from 'react';
import { mount } from 'enzyme';
import MessageStore from 'MessageStore';
import MessageBodyView from '../views/GroupContainer/GroupBodyContainer/MessageBody.jsx';

/* global jest localStorage window */

Object.defineProperty(window, 'localStorage', { value: jest.fn() });
localStorage.getItem = jest.fn();
localStorage.setItem = jest.fn();

jest.mock('MessageStore', () => {
  return {
    getMessage: () => (
      []
    ),
    addChangeListener: jest.genMockFunction(),
    removeChangeListener: jest.genMockFunction()
  };
});

describe('MessageBody', () => {
  let mountedComponent;
  let props;

  const messageBodyView = () => {
    if (!mountedComponent) {
      mountedComponent = mount(
        <MessageBodyView {...props}/>
      );
    }
    return mountedComponent;
  };

  beforeEach(() => {
    mountedComponent = undefined;
    props = {
      groupId: 'testGroupId'
    };
  });

  it('should render', () => {
    expect(messageBodyView()).toBeDefined();
  });

  it('should recieve props', () => {
    expect(Object.keys(messageBodyView().props()).length).toBeGreaterThan(0);
  });

  it('should render a message list view', () => {
    const component = messageBodyView();
    const messageListView = component.find('MessageListView');
    expect(messageListView).toBeDefined();
  });

  it('should render a send message view', () => {
    const component = messageBodyView();
    const sendMessageView = component.find('SendMessage');
    expect(sendMessageView).toBeDefined();
  });

  it('should attach an event listener on component mount', () => {
    messageBodyView();
    expect(MessageStore.addChangeListener).toHaveBeenCalled();
  });

  it('should remove event listener on component dismount', () => {
    const component = messageBodyView();
    component.unmount();
    expect(MessageStore.removeChangeListener).toHaveBeenCalled();
  });
});

