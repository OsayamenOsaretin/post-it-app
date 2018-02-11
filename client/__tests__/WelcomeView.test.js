import React from 'react';
import { shallow } from 'enzyme';
import WelcomeView from '../src/views/GroupContainer/WelcomeView.jsx';

describe('WelcomeView', () => {
  let mountedComponent;
  const welcomeView = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(
        <WelcomeView />
      );
    }
    return mountedComponent;
  };

  beforeEach(() => {
    mountedComponent = undefined;
  });

  it('should mount component successfully', () => {
    expect(welcomeView()).toBeDefined();
  });

  it('should render a div', () => {
    const component = welcomeView();
    const div = component.find('div');

    expect(div.length).toBeGreaterThan(0);
  });
});

