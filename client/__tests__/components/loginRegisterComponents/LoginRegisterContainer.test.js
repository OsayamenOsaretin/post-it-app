import React from 'react';
import { shallow } from 'enzyme';
import LoginRegisterContainer from
  '../../../src/views/LoginRegisterContainer/LoginRegisterContainer.jsx';

describe('LoginRegisterContainer', () => {
  let mountedComponent;
  const logRegContainer = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(
        <LoginRegisterContainer />
      );
      return mountedComponent;
    }

    beforeEach(() => {
      mountedComponent = undefined;
    });
  };

  it('should mount component successfully', () => {
    const component = logRegContainer();
    expect(component).toBeDefined();
  });
});
