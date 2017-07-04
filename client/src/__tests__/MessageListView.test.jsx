import React from 'react';
import { shallow } from 'enzyme';
import MessageListView from '../views/GroupContainer/GroupBodyContainer/MessageListView.jsx';

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
      messages: []
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
